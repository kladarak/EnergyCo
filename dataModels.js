var economy = {
	balance: 10000,
	salePricePerMW: 100,
	revenue: 0,
	upkeep: 0,
	
	onIncreaseSalePrice: function () {
		this.salePricePerMW += 10;
	},
	
	onDecreaseSalePrice: function () {
		this.salePricePerMW -= 10;
		
		if (this.salePricePerMW <= 0)
			this.salePricePerMW = 10;
	},
	
	tryPurchase: function(cost) {
		if (this.balance < cost)
			return false;
		
		economy.balance -= cost;
		return true;
	}
};

var power = {
	supply: 0,
	demand: 0,
};

var coal = {
	quarry: {
		supply: 40000,
	},
	
	mining: {
		rate: 0,
		upkeep: 0,
		
		minerCount: 0,
		minerRate: 10,
		minerUpkeep: 10,
		
		maxRate: 0,
		maxUpkeep: 0,
		
		priceHireMiner: 500,
		priceUpgradeRate: 2000,
		
		onHireMiner: function () {
			if (economy.tryPurchase(this.priceHireMiner))
			{
				this.minerCount++;
				this.refreshCaches();
			}
		},
		
		onUpgradeRate: function () {
			if (economy.tryPurchase(this.priceUpgradeRate))
			{
				this.minerRate += 5;
				this.minerUpkeep += 2;
				this.priceUpgradeRate += 1000;
				this.refreshCaches();
			}
		},
		
		refreshCaches: function () {
			this.maxRate = this.minerCount * this.minerRate;
			this.maxUpkeep = this.minerCount * this.minerUpkeep;
		},
	},
	
	storage: {
		stored: 0,
		upkeep: 0,
		
		unitCount: 0,
		unitCapacity: 2000,
		unitUpkeep: 100,
		
		maxCapacity: 0,
		maxUpkeep: 0,
		
		priceBuyUnit: 1000,
		priceUpgradeCapacity: 5000,
		
		onBuyUnit: function () {
			if (economy.tryPurchase(this.priceBuyUnit))
			{
				this.unitCount++;
				this.refreshCaches();
			}
		},
		
		onUpgradeCapacity: function () {
			if (economy.tryPurchase(this.priceUpgradeCapacity))
			{
				this.unitCapacity += 1000;
				this.unitUpkeep += 20;
				this.priceUpgradeCapacity += 5000;
				this.refreshCaches();
			}
		},
		
		refreshCaches: function () {
			this.maxCapacity = this.unitCount * this.unitCapacity;
			this.maxUpkeep = this.unitCount * this.unitUpkeep;
		},
	},
	
	generators: {
		output: 0,
		upkeep: 0,
		
		turbineCount: 0,
		turbineBurnRate: 10,
		turbineOutput: 50,
		turbineEfficiency: 40,
		turbineUpkeep: 50,
		
		maxBurnRate: 10,
		maxOutput: 0,
		maxUpkeep: 0,
		
		priceBuyTurbine: 500,
		priceUpgradeBurnRate: 5000,
		priceUpgradeOutput: 5000,
		priceUpgradeEfficiency: 5000,
		
		onBuyTurbine: function () {
			if (economy.tryPurchase(this.priceBuyTurbine))
			{
				this.turbineCount++;
				this.refreshCaches();
			}
		},
		
		onUpgradeBurnRate: function () {
			if (this.turbineBurnRate <= 5)
				return;
			
			if (economy.tryPurchase(this.priceUpgradeBurnRate))
			{
				this.turbineBurnRate -= 1;
				this.turbineUpkeep += 1;
				this.priceUpgradeBurnRate += 5000;
				this.refreshCaches();
			}
		},
		
		onUpgradeOutput: function () {
			if (economy.tryPurchase(this.priceUpgradeOutput))
			{
				this.turbineOutput += 10;
				this.turbineUpkeep += 5;
				this.priceUpgradeOutput += 5000;
				this.refreshCaches();
			}
		},
		
		onUpgradeEfficiency: function () {
			if (this.turbineEfficiency >= 95)
				return;
			
			if (economy.tryPurchase(this.priceUpgradeEfficiency))
			{
				this.turbineEfficiency += 5;
				this.turbineUpkeep += 10;
				this.priceUpgradeEfficiency += 5000;
				this.refreshCaches();
			}
		},
		
		refreshCaches: function () {
			this.maxBurnRate = this.turbineCount * this.turbineBurnRate;
			this.maxOutput = this.turbineCount * this.turbineOutput * this.turbineEfficiency / 100;
			this.maxUpkeep = this.turbineCount * this.turbineUpkeep;
		},
	},
	
	update: function () {
		// Mine
		this.mining.rate = Math.min(this.quarry.supply, this.mining.maxRate);;
		this.mining.upkeep = this.mining.maxUpkeep;
		this.quarry.supply -= this.mining.rate;
		this.storage.stored += this.mining.rate;
		
		// Burn
		let maxPowerableTurbines = Math.floor(this.storage.stored / this.generators.turbineBurnRate);
		let poweredTurbines = Math.min(maxPowerableTurbines, this.generators.turbineCount);
		let burnedCoal = poweredTurbines * this.generators.turbineBurnRate;
		this.generators.output = poweredTurbines * this.generators.turbineOutput * this.generators.turbineEfficiency / 100;
		this.generators.upkeep = this.generators.maxUpkeep;
		
		// Store
		this.storage.stored = Math.min(this.storage.stored - burnedCoal, this.storage.maxCapacity);
		this.storage.upkeep = this.storage.maxUpkeep;
	},
	
	calculateTotalUpkeep: function() {
		return this.mining.upkeep + this.storage.upkeep + this.generators.upkeep;
	},
};
