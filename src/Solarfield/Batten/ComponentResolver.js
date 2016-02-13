(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/batten-js/src/Solarfield/Batten/ComponentResolver',
			[
				'solarfield/ok-kit-js/src/Solarfield/Ok/ok'
			],
			factory
		);
	}

	else {
		factory(
			Solarfield.Ok
		);
	}
})
(function (Ok) {
	"use strict";

	/**
	 * @class Solarfield.Batten.ComponentResolver
	 */
	var ComponentResolver = function () {};

	ComponentResolver.prototype.resolveComponent = function (aChain, aClassNamePart, aViewTypeCode, aPluginCode) {
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
	ComponentResolver.prototype.generateClassName = function (aLink, aClassNamePart, aViewTypeCode, aPluginCode) {
		var className;

		className = '';

		className += aClassNamePart;

		return className;
	};

	Ok.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.ComponentResolver = ComponentResolver;
});
