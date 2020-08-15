var bindings = [];

function registerBindings() {
	bind("economy-balance",							economy,			"balance",					function (v) { return "$" + v; });
	bind("economy-sale-price",						economy,			"salePricePerMW",			function (v) { return "$" + v; });
	bind("economy-revenue",							economy,			"revenue",					function (v) { return "$" + v; });
	bind("economy-upkeep",							economy,			"upkeep",					function (v) { return "$" + v; });
	bind("economy-increase-sale-price",				economy,			"onIncreaseSalePrice");
	bind("economy-decrease-sale-price",				economy,			"onDecreaseSalePrice");
	
	bind("power-supply",							power,				"supply",					function (v) { return v + " MW"; });
	bind("power-demand",							power,				"demand",					function (v) { return v + " MW"; });
	
	bind("coal-quarry",								coal.quarry,		"supply",					function (v) { return v + " t"; });
	
	bind("coal-mining-rate",						coal.mining,		"rate",						function (v) { return v + " t"; });
	bind("coal-mining-upkeep",						coal.mining,		"upkeep",					function (v) { return "$" + v; });
	bind("coal-mining-miner-count",					coal.mining,		"minerCount",				function (v) { return v; });
	bind("coal-mining-miner-rate",					coal.mining,		"minerRate",				function (v) { return v + "t"; });
	bind("coal-mining-miner-upkeep",				coal.mining,		"minerUpkeep",				function (v) { return "$" + v; });
	bind("coal-mining-max-rate",					coal.mining,		"maxRate",					function (v) { return v + " t"; });
	//bind("coal-mining-max-upkeep",					coal.mining,		"maxUpkeep",				function (v) { return "$" + v; });
	bind("coal-mining-buy-miner",					coal.mining,		"priceHireMiner",			function (v) { return "Hire $" + v; });
	bind("coal-mining-buy-upgrade-rate",			coal.mining,		"priceUpgradeRate",			function (v) { return "Upgrade $" + v; });
	bind("coal-mining-buy-miner",					coal.mining,		"onHireMiner");
	bind("coal-mining-buy-upgrade-rate",			coal.mining,		"onUpgradeRate");
	
	bind("coal-storage-stored",						coal.storage,		"stored",					function (v) { return v + " t"; });
	bind("coal-storage-upkeep",						coal.storage,		"upkeep",					function (v) { return "$" + v; });
	bind("coal-storage-unit-count",					coal.storage,		"unitCount",				function (v) { return v; });
	bind("coal-storage-unit-capacity",				coal.storage,		"unitCapacity",				function (v) { return v + " t"; });
	bind("coal-storage-unit-upkeep",				coal.storage,		"unitUpkeep",				function (v) { return "$" + v; });
	bind("coal-storage-max-capacity",				coal.storage,		"maxCapacity",				function (v) { return v + " t"; });
	//bind("coal-storage-max-upkeep",					coal.storage,		"maxUpkeep",				function (v) { return "$" + v; });
	bind("coal-storage-buy-unit",					coal.storage,		"priceBuyUnit",				function (v) { return "Buy $" + v; });
	bind("coal-storage-buy-upgrade-capacity",		coal.storage,		"priceUpgradeCapacity",		function (v) { return "Upgrade $" + v; });
	bind("coal-storage-buy-unit",					coal.storage,		"onBuyUnit");
	bind("coal-storage-buy-upgrade-capacity",		coal.storage,		"onUpgradeCapacity");
	
	bind("coal-generators-output",					coal.generators,	"output",					function (v) { return v + " MW"; });
	bind("coal-generators-upkeep",					coal.generators,	"upkeep",					function (v) { return "$" + v; });
	bind("coal-generators-turbine-count",			coal.generators,	"turbineCount",				function (v) { return v; });
	bind("coal-generators-turbine-burn-rate",		coal.generators,	"turbineBurnRate",			function (v) { return v + " t"; });
	bind("coal-generators-turbine-output",			coal.generators,	"turbineOutput",			function (v) { return v + " MW"; });
	bind("coal-generators-turbine-efficiency",		coal.generators,	"turbineEfficiency",		function (v) { return v + "%"; });
	bind("coal-generators-turbine-upkeep",			coal.generators,	"turbineUpkeep",			function (v) { return "$" + v; });
	bind("coal-generators-max-burn-rate",			coal.generators,	"maxBurnRate",				function (v) { return v + " t"; });
	bind("coal-generators-max-output",				coal.generators,	"maxOutput",				function (v) { return v + " MW"; });
	//bind("coal-generators-max-upkeep",				coal.generators,	"maxUpkeep",				function (v) { return "$" + v; });
	bind("coal-generators-buy-turbine",				coal.generators,	"priceBuyTurbine",			function (v) { return "Buy $" + v; });
	bind("coal-generators-buy-upgrade-burn-rate",	coal.generators,	"priceUpgradeBurnRate",		function (v) { return "Upgrade $" + v; });
	bind("coal-generators-buy-upgrade-output",		coal.generators,	"priceUpgradeOutput",		function (v) { return "Upgrade $" + v; });
	bind("coal-generators-buy-upgrade-efficiency",	coal.generators,	"priceUpgradeEfficiency",	function (v) { return "Upgrade $" + v; });
	bind("coal-generators-buy-turbine",				coal.generators,	"onBuyTurbine");
	bind("coal-generators-buy-upgrade-burn-rate",	coal.generators,	"onUpgradeBurnRate");
	bind("coal-generators-buy-upgrade-output",		coal.generators,	"onUpgradeOutput");
	bind("coal-generators-buy-upgrade-efficiency",	coal.generators,	"onUpgradeEfficiency");
}

function bind(elementId, object, propertyName, formatValue) {
	let elem = document.getElementById(elementId);
	
	if (typeof object[propertyName] === "function") {
		elem.addEventListener('click', function () {
			object[propertyName]();
			refreshBindings();
		});
	}
	
	bindings.push({
		refresh: function () {
			if (formatValue)
				elem.innerHTML = formatValue(object[propertyName]);
		},
	});
}

function refreshBindings() {
	bindings.forEach(function (b) { b.refresh(); });
}
