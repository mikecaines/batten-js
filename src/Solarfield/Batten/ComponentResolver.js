(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/batten-js/src/Solarfield/Batten/ComponentResolver',
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
	const ComponentResolver = function () {};

	ComponentResolver.prototype.resolveComponent = function (aChain, aClassNamePart, aViewTypeCode, aPluginCode) {
		let chain = [];
		for (let k in aChain) {
			chain.unshift(aChain[k]);
		}

		let component = null;

		for (let k = 0; k < chain.length; k++) {
			//TODO: should be defaulted elsewhere
			const link = StructUtils.assign({
				namespace: null,
				pluginsSubNamespace: '.Plugins'
			}, chain[k]);

			let namespacePath = link.namespace != null ? link.namespace : '';

			if (aPluginCode) {
				namespacePath += link.pluginsSubNamespace;
				namespacePath += '.' + aPluginCode;
			}

			const namespaceObject = namespacePath != '' ? StructUtils.get(self, namespacePath) : self;

			if (namespaceObject) {
				const className = this.generateClassName(link, aClassNamePart, aViewTypeCode, aPluginCode);

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
		let className = '';

		className += aClassNamePart;

		return className;
	};

	ObjectUtils.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten['ComponentResolver'] = ComponentResolver;
});
