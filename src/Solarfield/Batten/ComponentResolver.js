(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			[
				'solarfield/ok-kit-js/src/Solarfield/Ok/ObjectUtils',
				'solarfield/ok-kit-js/src/Solarfield/Ok/StructUtils'
			],
			factory
		);
	}

	else {
		factory(
			Solarfield.Ok.ObjectUtils,
			Solarfield.Ok.StructUtils
		);
	}
})
(function (ObjectUtils, StructUtils) {
	"use strict";

	/**
	 * @class Solarfield.Batten.ComponentResolver
	 */
	var ComponentResolver = function () {};

	ComponentResolver.prototype.resolveComponent = function (aChain, aClassNamePart, aViewTypeCode, aPluginCode) {
		var chain = aChain.slice().reverse();
		var component = null;
		var i, link, namespacePath, namespaceObject, className;
		
		for (i = 0; i < chain.length; i++) {
			//TODO: should be defaulted elsewhere
			link = StructUtils.assign({
				namespace: null,
				pluginsSubNamespace: '.Plugins'
			}, chain[i]);

			namespacePath = link.namespace != null ? link.namespace : '';

			if (aPluginCode) {
				namespacePath += link.pluginsSubNamespace;
				namespacePath += '.' + aPluginCode;
			}

			namespaceObject = namespacePath != '' ? StructUtils.get(self, namespacePath) : self;

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
	ComponentResolver.prototype.generateClassName = function (aLink, aClassNamePart, aViewTypeCode, aPluginCode) {
		var className = '';

		className += aClassNamePart;

		return className;
	};

	ObjectUtils.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten['ComponentResolver'] = ComponentResolver;
});
