var UNIT = {
	NONE: 0,
	MONEY: 1,
	MASS: 2,
	POWER: 3,
	PERCENTAGE: 4,
	BUY: 5,
	UPGRADE: 6,
};

function formatValue(value, unit) {
	switch (unit)
	{
		case UNIT.NONE: return value;
		case UNIT.MONEY: return "$" + value + " k";
		case UNIT.MASS: return value + " kt";
		case UNIT.POWER: return value + " MW";
		case UNIT.PERCENTAGE: return value + "%";
		case UNIT.BUY: return "Buy: $" + value;
		case UNIT.UPGRADE: return "Upgrade: $" + value;
		default: return value;
	}
}

function findUnitFromClass(className) {
	if (className.indexOf("money") !== -1) return UNIT.MONEY;
	if (className.indexOf("mass") !== -1) return UNIT.MASS;
	if (className.indexOf("power") !== -1) return UNIT.POWER;
	if (className.indexOf("perc") !== -1) return UNIT.PERCENTAGE;
	if (className.indexOf("buy") !== -1) return UNIT.BUY;
	if (className.indexOf("upgrade") !== -1) return UNIT.UPGRADE;
	return UNIT.NONE;
}

function getObjectFromPath(path) {
	let object = dataModel;
	for (let i = 0; i < path.length - 1; ++i)
		object = object[path[i]];
	
	return object;
}

function getPropertyNameFromPath(path) {
	return path[path.length - 1];
}

var bindings = [];

function registerBindings() {
	let valueElems = document.getElementsByClassName("value");
	for (i = 0; i < valueElems.length; i++) {
		let elem = valueElems[i];
		let path = elem.id.split("-");
		
		let object = getObjectFromPath(path);
		let propertyName = getPropertyNameFromPath(path);
		let unitType = findUnitFromClass(elem.className);
		
		bindings.push({
			refresh: function () {
				elem.innerHTML = formatValue(object[propertyName], unitType);
			},
		});
	}
	
	let actionElems = document.getElementsByClassName("action-button");
	for (i = 0; i < actionElems.length; i++) {
		let elem = actionElems[i];
		let path = elem.id.split("-");
		
		let object = getObjectFromPath(path);
		let propertyName = getPropertyNameFromPath(path);
		
		elem.addEventListener('click', function () {
			object[propertyName]();
			refreshBindings();
		});
	}
}

function refreshBindings() {
	bindings.forEach(function (b) { b.refresh(); });
}
