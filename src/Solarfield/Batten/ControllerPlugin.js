"use strict";

/**
 * @namespace Solarfield.Batten
 */
Solarfield.Ok.defineNamespace('Solarfield.Batten');




/**
 *
 * @param {Solarfield.Batten.Controller} aController
 * @param {string} aCode
 * @constructor
 */
Solarfield.Batten.ControllerPlugin = function (aController, aCode) {
	this._bcp_controller = aController;
	this._bcp_code = aCode;
	this._bcp_eventTarget = new Solarfield.Batten.EventTarget();
};

/**
 * @protected
 */
Solarfield.Batten.ControllerPlugin.prototype.dispatchEvent = function (aEvent) {
	this._bcp_eventTarget.dispatchEvent(this, aEvent);
};

Solarfield.Batten.ControllerPlugin.prototype.getController = function () {
	return this._bcp_controller;
};

Solarfield.Batten.ControllerPlugin.prototype.addEventListener = function (aEventType, aListener) {
	this._bcp_eventTarget.addEventListener(aEventType, aListener);
};
