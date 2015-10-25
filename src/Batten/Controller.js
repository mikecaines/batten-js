"use strict";

/**
 * @namespace Batten
 */
if (!self.Batten) self.Batten = {};




/**
 * @class Batten.Controller
 * @param {String} aCode
 * @param {Object} aOptions
 */
Batten.Controller = function (aCode, aOptions) {
	this._bc_model = null;
	this._bc_code = aCode+'';
	this._bc_plugins = null;
	this._bc_eventTarget = new Batten.EventTarget();
};

/**
 * @private
 * @static
 */
Batten.Controller._bc_baseChain = null;

/**
 * Sets the base chain.
 * @param {object} aData
 * @static
 * @protected
 */
Batten.Controller.setBaseChain = function (aData) {
	Batten.Controller._bc_baseChain = aData;
};

/**
 * @static
 * @protected
 * @returns {object}
 */
Batten.Controller.getBaseChain = function () {
	return Batten.Controller._bc_baseChain;
};

/**
 * @static
 * @returns {Batten.ComponentResolver}
 */
Batten.Controller.getComponentResolver = function () {
	return new Batten.ComponentResolver();
};

/**
 * Gets the MVC chain for the specified module code.
 * @returns {object|null}
 * @static
 */
Batten.Controller.getChain = function (aModuleCode) {
	var chain = Ok.cloneObject(this.getBaseChain());

	if (aModuleCode != null) {
		chain['module'] = {
			namespace: 'App.Modules.' + Ok.strUpperCaseFirst(aModuleCode)
		};
	}

	return chain;
};

/**
 * Creates an instance of the appropriate module class.
 * @param {String} aCode
 * @param {Object=} aOptions
 * @returns {Batten.Controller|null}
 * @static
 */
Batten.Controller.fromCode = function (aCode, aOptions) {
	var controller, component;

	component = this.getComponentResolver().resolveComponent(
		this.getChain(aCode),
		'Controller'
	);

	if (!component) {
		throw new Error(
			"Could not resolve Controller component for module '"  + aCode + "'."
		);
	}

	controller = new component.classObject(aCode, aOptions);

	return controller;
};

/**
 * @protected
 */
Batten.Controller.prototype.resolvePlugins = function () {

};

/**
 * @protected
 */
Batten.Controller.prototype.dispatchEvent = function (aEvent) {
	this._bc_eventTarget.dispatchEvent(this, aEvent);
};

Batten.Controller.prototype.addEventListener = function (aEventType, aListener) {
	this._bc_eventTarget.addEventListener(aEventType, aListener);
};

Batten.Controller.prototype.getPlugins = function () {
	if (!this._bc_plugins) {
		this._bc_plugins = new Batten.ControllerPlugins(this);
	}

	return this._bc_plugins;
};

Batten.Controller.prototype.getModel = function () {
	if (!this._bc_model) {
		this._bc_model = new Batten.Model();
	}

	return this._bc_model;
};

Batten.Controller.prototype.hookup = function () {

};

Batten.Controller.prototype.init = function () {
	this.resolvePlugins();
};

Batten.Controller.prototype.getCode = function () {
	return this._bc_code;
};

Batten.Controller.prototype.go = function () {

};
