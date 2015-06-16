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

Batten.ComponentResolver.prototype.resolveComponent = function (aChain, aClassNamePart) {
	var component, link, namespace, className, k, chain;

	chain = [];
	for (k in aChain) {
		chain.unshift(aChain[k]);
	}

	component = null;

	for (k = 0; k < chain.length; k++) {
		link = chain[k];

		namespace = link.namespace != null ? self[link.namespace] : self;

		if (namespace) {
			className = this.generateClassName(link, aClassNamePart);

			if (className in namespace) {
				component = {
					classObject: namespace[className]
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
Batten.ComponentResolver.prototype.generateClassName = function (aLink, aClassNamePart) {
	var className;

	className = aLink.moduleClassNamePart || '';

	className += aClassNamePart;

	return className;
};




/**
 * @param aCode
 * @class Batten.Controller
 */
Batten.Controller = function (aCode) {
	this._bc_model = null;
	this._bc_code = aCode+'';
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
 */
Batten.Controller.setBaseChain = function (aData) {
	this._bc_baseChain = aData;
};

/**
 * @static
 * @returns {object}
 */
Batten.Controller.getBaseChain = function () {
	return this._bc_baseChain;
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
		chain[aModuleCode] = {
			namespace: 'app',
			moduleClassNamePart: Ok.strUpperCaseFirst(aModuleCode)
		};
	}

	return chain;
};

/**
 * Creates an instance of the appropriate module class.
 * @param aCode
 * @returns {Batten.Controller|null}
 * @static
 */
Batten.Controller.fromCode = function (aCode) {
	var controller, component;

	component = app.Controller.getComponentResolver().resolveComponent(
		this.getChain(aCode),
		'Controller'
	);

	if (!component) {
		throw new Error(
			"Could not resolve Controller component for module '"  + aCode + "'."
		);
	}

	controller = new component.classObject(aCode);

	return controller;
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

};

Batten.Controller.prototype.getCode = function () {
	return this._bc_code;
};

Batten.Controller.prototype.go = function () {

};
