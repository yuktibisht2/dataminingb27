/*global QUnit*/

sap.ui.define([
	"app/dataminingb27/controller/DataMiningView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("DataMiningView Controller");

	QUnit.test("I should test the DataMiningView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
