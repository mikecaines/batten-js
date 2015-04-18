"use strict";

/**
 * @namespace batten
 */
if (!self.batten) self.batten = {};




/**
 * @class batten.Model
 * @extends ok.HashMap
 */
batten.Model = ok.extendObject(ok.HashMap);




/**
 * @class batten.ComponentResolver
 */
batten.ComponentResolver = function () {};

batten.ComponentResolver.prototype.resolveComponent = function (aChain, aClassNamePart) {
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
batten.ComponentResolver.prototype.generateClassName = function (aLink, aClassNamePart) {
	var className;

	className = aLink.moduleClassNamePart || '';

	className += aClassNamePart;

	return className;
};




/**
 * @param aCode
 * @class batten.Controller
 */
batten.Controller = function (aCode) {
	this._bc_model = null;
	this._bc_code = aCode+'';
};

/**
 * @private
 * @static
 */
batten.Controller._bc_baseChain = null;

/**
 * Sets the base chain.
 * @param {object} aData
 * @static
 */
batten.Controller.setBaseChain = function (aData) {
	this._bc_baseChain = aData;
};

/**
 * @static
 * @returns {object}
 */
batten.Controller.getBaseChain = function () {
	return this._bc_baseChain;
};

/**
 * @static
 * @returns {batten.ComponentResolver}
 */
batten.Controller.getComponentResolver = function () {
	return new batten.ComponentResolver();
};

/**
 * Gets the MVC chain for the specified module code.
 * @returns {object|null}
 * @static
 */
batten.Controller.getChain = function (aModuleCode) {
	var chain = ok.cloneObject(this.getBaseChain());

	if (aModuleCode != null) {
		chain[aModuleCode] = {
			namespace: 'app',
			moduleClassNamePart: ok.strUpperCaseFirst(aModuleCode)
		};
	}

	return chain;
};

/**
 * Creates an instance of the appropriate module class.
 * @param aCode
 * @returns {batten.Controller|null}
 * @static
 */
batten.Controller.fromCode = function (aCode) {
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

batten.Controller.prototype.getModel = function () {
	if (!this._bc_model) {
		this._bc_model = new batten.Model();
	}

	return this._bc_model;
};

batten.Controller.prototype.hookup = function () {

};

batten.Controller.prototype.init = function () {

};

batten.Controller.prototype.getCode = function () {
	return this._bc_code;
};

batten.Controller.prototype.go = function () {

};
