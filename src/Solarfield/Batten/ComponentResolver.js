"use strict";

/**
 * @namespace Solarfield.Batten
 */
Solarfield.Ok.defineNamespace('Solarfield.Batten');




/**
 * @class Solarfield.Batten.ComponentResolver
 */
Solarfield.Batten.ComponentResolver = function () {};

Solarfield.Batten.ComponentResolver.prototype.resolveComponent = function (aChain, aClassNamePart, aViewTypeCode, aPluginCode) {
	var component, link, namespaceObject, namespacePath, className, k, chain;

	chain = [];
	for (k in aChain) {
		chain.unshift(aChain[k]);
	}

	component = null;

	for (k = 0; k < chain.length; k++) {
		//TODO: should be defaulted elsewhere
		link = Solarfield.Ok.objectAssign({
			namespace: null,
			pluginsSubNamespace: '.Plugins'
		}, chain[k]);

		namespacePath = link.namespace != null ? link.namespace : '';

		if (aPluginCode) {
			namespacePath += link.pluginsSubNamespace;
			namespacePath += '.' + aPluginCode;
		}

		namespaceObject = namespacePath != '' ? Solarfield.Ok.objectGet(self, namespacePath) : self;

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
Solarfield.Batten.ComponentResolver.prototype.generateClassName = function (aLink, aClassNamePart, aViewTypeCode, aPluginCode) {
	var className;

	className = '';

	className += aClassNamePart;

	return className;
};
