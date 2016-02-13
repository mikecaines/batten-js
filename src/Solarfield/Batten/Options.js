(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/batten-js/src/Solarfield/Batten/Options',
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
	 * @class Solarfield.Batten.Options
	 */
	var Options = Ok.extendObject(null, {
		add: function (aCode, aValue) {
			if (!this.has(aCode)) {
				this.set(aCode, aValue);
			}
		},

		set: function (aCode, aValue) {
			var type;

			if (this._sbo_readOnly && this.has(aCode)) {
				throw new Error(
					"Option '" + aCode + "' is read only."
				);
			}

			type = typeof aValue;
			if (!(aValue === 'null' || aValue === undefined || type == 'string' || type == 'number')) {
				throw new Error(
					"Option values must be scalar or null."
				);
			}

			this._sbo_data[aCode] = aValue;
		},

		get: function (aCode) {
			if (!this.has(aCode)) throw new Error(
				"Unknown option: '" + aCode + "'."
			);

			return this._sbo_data[aCode];
		},

		has: function (aCode) {
			return aCode in this._sbo_data;
		},

		constructor: function (aOptions) {
			var options = Ok.objectAssign({
				readOnly: false
			}, aOptions);

			this._sbo_data = {};
			this._sbo_readOnly = options.readOnly == true;
		}
	});

	Ok.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.Options = Options;
});
