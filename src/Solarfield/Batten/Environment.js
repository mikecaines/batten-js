"use strict";

/**
 * @namespace Solarfield.Batten
 */
Solarfield.Ok.defineNamespace('Solarfield.Batten');




/**
 * @constructor
 * @abstract
 */
Solarfield.Batten.Environment = function () {
	throw Error("ABSTRACT");
};

/**
 * @private
 * @static
 */
Solarfield.Batten.Environment._be_baseChain = null;

Solarfield.Batten.Environment.init = function (aOptions) {
	var options = Solarfield.Ok.objectAssign({
		baseChain: null
	}, aOptions);

	this._be_baseChain = options.baseChain;
};

/**
 * @static
 * @returns {object}
 */
Solarfield.Batten.Environment.getBaseChain = function () {
	return this._be_baseChain;
};
