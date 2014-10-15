// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");

var X_DIMENSION = "x";
var Y_DIMENSION = "y";

var Me = module.exports = function Position(dimension, value) {
	ensure.signature(arguments, [ String, Number ]);

	this._dimension = dimension;
	this._position = value;
};

Me.x = function x(value) {
	return new Me(X_DIMENSION, value);
};

Me.y = function y(value) {
	return new Me(Y_DIMENSION, value);
};

Me.prototype.diff = function diff(expected) {
	ensure.signature(arguments, [ Me ]);
	ensure.that(this._dimension === expected._dimension, "Cannot compare X dimension to Y dimension");

	var actualValue = this._position;
	var expectedValue = expected._position;

	var direction;
	if (this._dimension === X_DIMENSION) direction = expectedValue > actualValue ? "to the left" : "to the right";
	else direction = expectedValue > actualValue ? "lower" : "higher";

	var value = Math.abs(expectedValue - actualValue);
	if (value === 0) return "";
	else return value + "px " + direction;
};

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);

	return this._position + "px";
};

Me.prototype.equals = function equals(that) {
	ensure.signature(arguments, [ [Me, Number] ]);
	if (typeof that === "number") return this._position === that;

	ensure.that(this._dimension === that._dimension, "Cannot compare X dimension to Y dimension");
	return this._position === that._position;
};
