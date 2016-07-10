(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/batten-js/src/Solarfield/Batten/ControllerPlugin',
			[
				'solarfield/ok-kit-js/src/Solarfield/Ok/ObjectUtils',
				'solarfield/ok-kit-js/src/Solarfield/Ok/EventTarget'
			],
			factory
		);
	}

	else {
		factory(
			Solarfield.Ok.ObjectUtils,
			Solarfield.Ok.EventTarget
		);
	}
})
(function (ObjectUtils, EventTarget) {
	"use strict";

	/**
	 *
	 * @param {Solarfield.Batten.Controller} aController
	 * @param {string} aCode
	 * @constructor
	 */
	var ControllerPlugin = function (aController, aCode) {
		this._bcp_controller = aController;
		this._bcp_code = aCode;
		this._bcp_eventTarget = new EventTarget();
	};

	/**
	 * @protected
	 */
	ControllerPlugin.prototype.dispatchEvent = function (aEvent) {
		this._bcp_eventTarget.dispatchEvent(this, aEvent);
	};

	ControllerPlugin.prototype.getController = function () {
		return this._bcp_controller;
	};

	ControllerPlugin.prototype.addEventListener = function (aEventType, aListener) {
		this._bcp_eventTarget.addEventListener(aEventType, aListener);
	};

	ObjectUtils.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.ControllerPlugin = ControllerPlugin;
});
