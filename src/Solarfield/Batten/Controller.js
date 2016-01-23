(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/lightship-js/src/Solarfield/Batten/Controller',
			[
				'solarfield/ok-kit-js/src/Solarfield/Ok/ok',
				'solarfield/batten-js/src/Solarfield/Batten/ComponentResolver',
				'solarfield/batten-js/src/Solarfield/Batten/ControllerPlugins',
				'solarfield/batten-js/src/Solarfield/Batten/ControllerPlugin',
				'solarfield/batten-js/src/Solarfield/Batten/EventTarget',
				'solarfield/batten-js/src/Solarfield/Batten/Model'
			],
			factory
		);
	}

	else {
		factory(
			Solarfield.Ok,
			Solarfield.Batten.ComponentResolver,
			Solarfield.Batten.ControllerPlugins,
			Solarfield.Batten.ControllerPlugin,
			Solarfield.Batten.EventTarget,
			Solarfield.Batten.Model
		);
	}
})
(function (Ok, ComponentResolver, ControllerPlugins, ControllerPlugin, EvtTarget, Model) {
	"use strict";

	/**
	 * @class Solarfield.Batten.Controller
	 * @param {String} aCode
	 * @param {Object} aOptions
	 */
	var Controller = function (aCode, aOptions) {
		this._bc_model = null;
		this._bc_code = aCode+'';
		this._bc_plugins = null;
		this._bc_eventTarget = new EvtTarget();
	};

	Controller.boot = function (aInfo) {
		return App.Controller.fromCode(aInfo.moduleCode, aInfo.controllerOptions).then(function (controller) {
			controller.init();
			return controller;
		});
	};

	Controller.bail = function (aEx) {
		if (self.console) {
			console.error(aEx);
		}
	};

	/**
	 * @static
	 * @returns {Solarfield.Batten.ComponentResolver}
	 */
	Controller.getComponentResolver = function () {
		return new ComponentResolver();
	};

	/**
	 * Gets the MVC chain for the specified module code.
	 * @returns {object|null}
	 * @static
	 */
	Controller.getChain = function (aModuleCode) {
		var chain = Ok.cloneObject(App.Environment.getBaseChain());

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
	 * @returns {Promise<Solarfield.Batten.Controller|null>}
	 * @static
	 */
	Controller.fromCode = function (aCode, aOptions) {
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

		return Promise.resolve(controller);
	};

	/**
	 * @protected
	 */
	Controller.prototype.resolvePlugins = function () {

	};

	/**
	 * @protected
	 */
	Controller.prototype.dispatchEvent = function (aEvent) {
		this._bc_eventTarget.dispatchEvent(this, aEvent);
	};

	Controller.prototype.addEventListener = function (aEventType, aListener) {
		this._bc_eventTarget.addEventListener(aEventType, aListener);
	};

	Controller.prototype.getPlugins = function () {
		if (!this._bc_plugins) {
			this._bc_plugins = new ControllerPlugins(this);
		}

		return this._bc_plugins;
	};

	Controller.prototype.getModel = function () {
		if (!this._bc_model) {
			this._bc_model = new Model();
		}

		return this._bc_model;
	};

	Controller.prototype.connect = function () {
		var controller = this;

		return new Promise(function (resolve, reject) {
			function handleDomReady() {
				document.removeEventListener('DOMContentLoaded', handleDomReady);

				try {
					controller.hookup();
					resolve();
				}
				catch (ex) {reject(ex)}
			}

			if (self.document && ['interactive', 'complete'].includes(document.readyState)) {
				handleDomReady();
			}

			else {
				document.addEventListener('DOMContentLoaded', handleDomReady);
			}
		});
	};

	Controller.prototype.hookup = function () {

	};

	Controller.prototype.run = function () {
		this.doTask();
	};

	Controller.prototype.doTask = function () {

	};

	Controller.prototype.init = function () {
		this.resolvePlugins();
	};

	Controller.prototype.getCode = function () {
		return this._bc_code;
	};

	Controller.prototype.handleException = function (aEx) {
		if (self.console) {
			console.error(aEx);
		}
	};

	Ok.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.Controller = Controller;
});
