(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/lightship-js/src/Solarfield/Batten/Environment',
			[
				'solarfield/ok-kit-js/src/Solarfield/Ok/ok'
			],
			factory
		);
	}

	else {
		factory(
			Solarfield.Ok
		);
	}
})
(function (Ok) {
	"use strict";

	/**
	 * @constructor
	 * @abstract
	 */
	var Environment = function () {
		throw Error("ABSTRACT");
	};

	/**
	 * @private
	 * @static
	 */
	Environment._be_baseChain = null;

	Environment.init = function (aOptions) {
		var options = Ok.objectAssign({
			baseChain: null
		}, aOptions);

		this._be_baseChain = options.baseChain;
	};

	/**
	 * @static
	 * @returns {object}
	 */
	Environment.getBaseChain = function () {
		return this._be_baseChain;
	};

	Ok.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.Environment = Environment;
});
