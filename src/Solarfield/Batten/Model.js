(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/lightship-js/src/Solarfield/Batten/Model',
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
	 * @class Solarfield.Batten.Model
	 * @extends Solarfield.Ok.HashMap
	 */
	var Model = Ok.extendObject(Ok.HashMap);

	Ok.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.Model = Model;
});
