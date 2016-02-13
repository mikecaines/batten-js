(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/batten-js/src/Solarfield/Batten/Model',
			[
				'solarfield/ok-kit-js/src/Solarfield/Ok/ok',
				'solarfield/ok-kit-js/src/Solarfield/Ok/StructProxy'
			],
			factory
		);
	}

	else {
		factory(
			Solarfield.Ok,
			Solarfield.Ok.StructProxy
		);
	}
})
(function (Ok, StructProxy) {
	"use strict";

	/**
	 * @class Solarfield.Batten.Model
	 * @extends Solarfield.Ok.StructProxy
	 */
	var Model = Ok.extendObject(StructProxy);

	Ok.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.Model = Model;
});
