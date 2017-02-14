(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
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
	Environment._be_baseChain = [];

	Environment.init = function (aOptions) {
		const options = StructUtils.assign({
			debug: false,
			vars: {}
		}, aOptions);
		
		if (!self.App) self.App = {};
		
		self.App.DEBUG = options.debug == true;

		//prepend batten-js (it should always be low-level, even if init() is called late)
		Environment._be_baseChain.unshift({
			id: 'solarfield/batten-js',
			namespace: 'Solarfield.Batten',
		});
		
		//append app
		Environment._be_baseChain.push({
			id: 'app',
			namespace: 'App',
		});

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
		return Environment._be_baseChain.slice();
	};

	Environment.getVars = function () {
		if (!Environment._be_vars) {
			Environment._be_vars = new Options({
				readOnly:true
			});
		}

		return Environment._be_vars;
	};

	Environment.getLogger = function () {
		if (!Environment._be_logger) {
			Environment._be_logger = new Logger();
		}

		return Environment._be_logger;
	};

	ObjectUtils.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.Environment = Environment;
});
