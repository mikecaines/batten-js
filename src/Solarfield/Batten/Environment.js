(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/batten-js/src/Solarfield/Batten/Environment',
			[
				'solarfield/ok-kit-js/src/Solarfield/Ok/ObjectUtils',
				'solarfield/ok-kit-js/src/Solarfield/Ok/StructUtils',
				'solarfield/batten-js/src/Solarfield/Batten/Options',
				'solarfield/batten-js/src/Solarfield/Batten/Logger'
			],
			factory
		);
	}

	else {
		factory(
			Solarfield.Ok.ObjectUtils,
			Solarfield.Ok.StructUtils,
			Solarfield.Batten.Options,
			Solarfield.Batten.Logger
		);
	}
})
(function (ObjectUtils, StructUtils, Options, Logger) {
	"use strict";

	/**
	 * @constructor
	 * @abstract
	 */
	const Environment = function () {
		throw Error("ABSTRACT");
	};

	/**
	 * @private
	 * @static
	 */
	Environment._be_baseChain = null;

	Environment.init = function (aOptions) {
		const options = StructUtils.assign({
			baseChain: null,
			vars: {}
		}, aOptions);

		this._be_baseChain = options.baseChain;

		let vars = this.getVars();
		Object.keys(options.vars).forEach(function (k) {
			vars.set(k, options.vars[k]);
		});
	};

	/**
	 * @static
	 * @returns {object}
	 */
	Environment.getBaseChain = function () {
		return this._be_baseChain;
	};

	Environment.getVars = function () {
		if (!this._be_vars) {
			this._be_vars = new Options({
				readOnly:true
			});
		}

		return this._be_vars;
	};

	Environment.getLogger = function () {
		if (!this._be_logger) {
			this._be_logger = new Logger();
		}

		return this._be_logger;
	};

	ObjectUtils.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.Environment = Environment;
});
