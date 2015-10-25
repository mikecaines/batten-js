"use strict";

/**
 * @namespace Batten
 */
if (!self.Batten) self.Batten = {};




/**
 *
 * @param {Batten.Controller} aController
 * @constructor
 */
Batten.ControllerPlugins = function (aController) {
	this._bcp_controller = aController;
	this._bcp_items = {};
};

Batten.ControllerPlugins.prototype.register = function (aComponentCode, aInstallationCode) {
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

Batten.ControllerPlugins.prototype.get = function (aInstallationCode) {
	if (this._bcp_items[aInstallationCode] && this._bcp_items[aInstallationCode].plugin) {
		return this._bcp_items[aInstallationCode].plugin;
	}

	return null;
};
