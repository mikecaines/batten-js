(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/batten-js/src/Solarfield/Batten/EventTarget',
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
	 * @class Solarfield.Batten.EventTarget
	 */
	var EventTarget = Ok.extendObject(Object, {
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

	Ok.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.EventTarget = EventTarget;
});
