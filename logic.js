function update() {
	setTimeout(update, 1000);
	
	research.update();
	coal.update();
	
	power.supply = coal.generators.output;
	
	economy.revenue = Math.min(power.supply, power.demand) * economy.salePricePerMW;
	economy.upkeep = coal.calculateTotalUpkeep();
	economy.upkeep += research.upkeep;
	economy.balance += economy.revenue - economy.upkeep;
	
	power.demand += 1;
	
	refreshBindings();
}
