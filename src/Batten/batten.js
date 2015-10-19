"use strict";

/**
 * @namespace Batten
 */
if (!self.Batten) self.Batten = {};




/**
 * @class Batten.Model
 * @extends Ok.HashMap
 */
Batten.Model = Ok.extendObject(Ok.HashMap);




/**
 * @class Batten.ComponentResolver
 */
Batten.ComponentResolver = function () {};

Batten.ComponentResolver.prototype.resolveComponent = function (aChain, aClassNamePart, aViewTypeCode, aPluginCode) {
	var component, link, namespaceObject, namespacePath, className, k, chain;

	chain = [];
	for (k in aChain) {
		chain.unshift(aChain[k]);
	}

	component = null;

	for (k = 0; k < chain.length; k++) {
		//TODO: should be defaulted elsewhere
		link = Ok.objectAssign({
			namespace: null,
			pluginsSubNamespace: '.Plugins'
		}, chain[k]);

		namespacePath = link.namespace != null ? link.namespace : '';

		if (aPluginCode) {
			namespacePath += link.pluginsSubNamespace;
			namespacePath += '.' + aPluginCode;
		}

		namespaceObject = namespacePath != '' ? Ok.objectGet(self, namespacePath) : self;

		if (namespaceObject) {
			className = this.generateClassName(link, aClassNamePart, aViewTypeCode, aPluginCode);

			if (className in namespaceObject) {
				component = {
					classObject: namespaceObject[className]
				};

				break;
			}
		}
	}

	return component;
};

/**
 * @returns {string}
 */
Batten.ComponentResolver.prototype.generateClassName = function (aLink, aClassNamePart, aViewTypeCode, aPluginCode) {
	var className;

	className = '';

	className += aClassNamePart;

	return className;
};




/**
 * @constructor
 * @abstract
 */
Batten.Environment = function () {
	throw Error("ABSTRACT");
};

Batten.Environment.init = function (aOptions) {

};




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




/**
 * @class Batten.EventTarget
 */
Batten.EventTarget = Ok.extendObject(Object, {
	constructor : function () {
		this._bet_listeners = {}
	},

	addEventListener: function (aEventType, aListener) {
		var i;

		if (!this._bet_listeners[aEventType]) this._bet_listeners[aEventType] = [];

		for (i = 0; i < this._bet_listeners[aEventType].length; i++) {
			if (this._bet_listeners[aEventType][i] === aListener) return;
		}
		this._bet_listeners[aEventType].push(aListener);
	},

	dispatchEvent: function (aThisContext, aEvent) {
		var i;

		if (this._bet_listeners[aEvent.type]) {
			for (i = 0; i < this._bet_listeners[aEvent.type].length; i++) {
				this._bet_listeners[aEvent.type][i].call(aThisContext, aEvent);
			}
		}
	}
});
