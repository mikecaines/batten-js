"use strict";

/**
 * @namespace Solarfield.Batten
 */
Solarfield.Ok.defineNamespace('Solarfield.Batten');




/**
 * @class Solarfield.Batten.Controller
 * @param {String} aCode
 * @param {Object} aOptions
 */
Solarfield.Batten.Controller = function (aCode, aOptions) {
	this._bc_model = null;
	this._bc_code = aCode+'';
	this._bc_plugins = null;
	this._bc_eventTarget = new Solarfield.Batten.EventTarget();
};

/**
 * @static
 * @returns {Solarfield.Batten.ComponentResolver}
 */
Solarfield.Batten.Controller.getComponentResolver = function () {
	return new Solarfield.Batten.ComponentResolver();
};

/**
 * Gets the MVC chain for the specified module code.
 * @returns {object|null}
 * @static
 */
Solarfield.Batten.Controller.getChain = function (aModuleCode) {
	var chain = Solarfield.Ok.cloneObject(App.Environment.getBaseChain());

	if (aModuleCode != null) {
		chain['module'] = {
			namespace: 'App.Modules.' + Solarfield.Ok.strUpperCaseFirst(aModuleCode)
		};
	}

	return chain;
};

/**
 * Creates an instance of the appropriate module class.
 * @param {String} aCode
 * @param {Object=} aOptions
 * @returns {Solarfield.Batten.Controller|null}
 * @static
 */
Solarfield.Batten.Controller.fromCode = function (aCode, aOptions) {
	var controller, component;

	component = this.getComponentResolver().resolveComponent(
		this.getChain(aCode),
		'Controller'
	);

	if (!component) {
		throw new Error(
			"Could not resolve Controller component for module '" + aCode + "'."
		);
	}

	controller = new component.classObject(aCode, aOptions);

	return controller;
};

/**
 * @protected
 */
Solarfield.Batten.Controller.prototype.resolvePlugins = function () {

};

/**
 * @protected
 */
Solarfield.Batten.Controller.prototype.dispatchEvent = function (aEvent) {
	this._bc_eventTarget.dispatchEvent(this, aEvent);
};

Solarfield.Batten.Controller.prototype.addEventListener = function (aEventType, aListener) {
	this._bc_eventTarget.addEventListener(aEventType, aListener);
};

Solarfield.Batten.Controller.prototype.getPlugins = function () {
	if (!this._bc_plugins) {
		this._bc_plugins = new Solarfield.Batten.ControllerPlugins(this);
	}

	return this._bc_plugins;
};

Solarfield.Batten.Controller.prototype.getModel = function () {
	if (!this._bc_model) {
		this._bc_model = new Solarfield.Batten.Model();
	}

	return this._bc_model;
};

Solarfield.Batten.Controller.prototype.hookup = function () {

};

Solarfield.Batten.Controller.prototype.init = function () {
	this.resolvePlugins();
};

Solarfield.Batten.Controller.prototype.getCode = function () {
	return this._bc_code;
};

Solarfield.Batten.Controller.prototype.go = function () {

};
