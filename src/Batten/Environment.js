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

Batten.Environment.init = function (aOptions) {

};
