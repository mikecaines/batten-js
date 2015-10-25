"use strict";

/**
 * @namespace Batten
 */
if (!self.Batten) self.Batten = {};




/**
 *
 * @param {Batten.Controller} aController
 * @param {string} aCode
 * @constructor
 */
Batten.ControllerPlugin = function (aController, aCode) {
	this._bcp_controller = aController;
	this._bcp_code = aCode;
	this._bcp_eventTarget = new Batten.EventTarget();
};

/**
 * @protected
 */
Batten.ControllerPlugin.prototype.dispatchEvent = function (aEvent) {
	this._bcp_eventTarget.dispatchEvent(this, aEvent);
};

Batten.ControllerPlugin.prototype.getController = function () {
	return this._bcp_controller;
};

Batten.ControllerPlugin.prototype.addEventListener = function (aEventType, aListener) {
	this._bcp_eventTarget.addEventListener(aEventType, aListener);
};
