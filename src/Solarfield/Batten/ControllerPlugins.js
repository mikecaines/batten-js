(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/batten-js/src/Solarfield/Batten/ControllerPlugins',
			[
				'solarfield/ok-kit-js/src/Solarfield/Ok/ObjectUtils'
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
(function (ObjectUtils) {
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

	ControllerPlugins.prototype.register = function (aComponentCode, aOptions) {
		var plugin, component;

		if (this._bcp_items[aComponentCode]) throw new Error(
			"Plugin '" + aComponentCode + "' is already registered."
		);

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

		this._bcp_items[aComponentCode] = {
			plugin: plugin,
			componentCode: aComponentCode
		};

		return this.get(aComponentCode);
	};

	ControllerPlugins.prototype.get = function (aComponentCode) {
		if (this._bcp_items[aComponentCode] && this._bcp_items[aComponentCode].plugin) {
			return this._bcp_items[aComponentCode].plugin;
		}

		return null;
	};

	ControllerPlugins.prototype.getByClass = function (aClass) {
		var plugin = null;
		var k;

		for (k in this._bcp_items) {
			if (this._bcp_items[k].plugin && this._bcp_items[k].plugin instanceof aClass) {
				if (plugin) throw new Error(
						"Could not retrieve plugin because multiple instances of " + aClass + " are registered."
				);

				plugin = this._bcp_items[k].plugin;
			}
		}

		return plugin;
	};

	ObjectUtils.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.ControllerPlugins = ControllerPlugins;
});
