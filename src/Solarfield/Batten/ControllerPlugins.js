(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/batten-js/src/Solarfield/Batten/ControllerPlugins',
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
	 *
	 * @param {Solarfield.Batten.Controller} aController
	 * @constructor
	 */
	var ControllerPlugins = function (aController) {
		this._bcp_controller = aController;
		this._bcp_items = {};
	};

	ControllerPlugins.prototype.register = function (aComponentCode, aInstallationCode) {
		var plugin, component;

		if (!this._bcp_items[aInstallationCode]) {
			plugin = null;

			component = this._bcp_controller.constructor.getComponentResolver().resolveComponent(
				this._bcp_controller.constructor.getChain(this._bcp_controller.getCode()),
				'ControllerPlugin',
				null,
				aComponentCode
			);

			if (component) {
				plugin = new component.classObject(this._bcp_controller, aComponentCode);
			}

			this._bcp_items[aInstallationCode] = {
				plugin: plugin,
				componentCode: aComponentCode
			};
		}
	};

	ControllerPlugins.prototype.get = function (aInstallationCode) {
		if (this._bcp_items[aInstallationCode] && this._bcp_items[aInstallationCode].plugin) {
			return this._bcp_items[aInstallationCode].plugin;
		}

		return null;
	};

	Ok.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.ControllerPlugins = ControllerPlugins;
});
