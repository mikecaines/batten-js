"use strict";

/**
 * @namespace Batten
 */
if (!self.Batten) self.Batten = {};




/**
 * @constructor
 * @abstract
 */
Batten.Environment = function () {
	throw Error("ABSTRACT");
};

/**
 * @private
 * @static
 */
Batten.Environment._be_baseChain = null;

Batten.Environment.init = function (aOptions) {
	var options = Ok.objectAssign({
		baseChain: null
	}, aOptions);

	this._be_baseChain = options.baseChain;
};

/**
 * @static
 * @returns {object}
 */
Batten.Environment.getBaseChain = function () {
	return this._be_baseChain;
};
