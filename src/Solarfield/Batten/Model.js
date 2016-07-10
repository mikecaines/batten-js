(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(
			'solarfield/batten-js/src/Solarfield/Batten/Model',
			[
				'solarfield/ok-kit-js/src/Solarfield/Ok/ObjectUtils',
				'solarfield/ok-kit-js/src/Solarfield/Ok/StructProxy'
			],
			factory
		);
	}

	else {
		factory(
			Solarfield.Ok.ObjectUtils,
			Solarfield.Ok.StructProxy
		);
	}
})
(function (ObjectUtils, StructProxy) {
	"use strict";

	/**
	 * @class Solarfield.Batten.Model
	 * @extends Solarfield.Ok.StructProxy
	 */
	var Model = ObjectUtils.extend(StructProxy);

	ObjectUtils.defineNamespace('Solarfield.Batten');
	return Solarfield.Batten.Model = Model;
});
