"use strict";

/**
 * @namespace Solarfield.Batten
 */
Solarfield.Ok.defineNamespace('Solarfield.Batten');




/**
 * @class Solarfield.Batten.EventTarget
 */
Solarfield.Batten.EventTarget = Solarfield.Ok.extendObject(Object, {
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
