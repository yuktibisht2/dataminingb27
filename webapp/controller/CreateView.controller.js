sap.ui.define([
    "./BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
  ],
  
  function(BaseController, Controller, MessageBox) {
    "use strict";
  
    return Controller.extend("app.dataminingb27.controller.CreateView", {
        onInit: function() {
            let oView = this.getView();
            let fieldIds =  ["LocationIdInput", "LocationDescriptionInput", "AllocatedMiningResourceInput", "TotalCostInput", "PossibleMineralReportInput", "NumberOfDrillsInput", "TypeOfMineralInput"];
       
            fieldIds.forEach(fieldId => {
                oView.byId(fieldId).attachLiveChange(this.onSetNone, this);
            });
        },

        onSetNone: function (oEvent) {
            oEvent.getSource().setValueState("None");
        },
        _clearFields: function () {
            let oView = this.getView();
            ["LocationIdInput", "LocationDescriptionInput", "AllocatedMiningResourceInput", "TotalCostInput", "PossibleMineralReportInput", "NumberOfDrillsInput","TypeOfMineralInput"].forEach(fieldId => {
                oView.byId(fieldId).setValue("");
                oView.byId(fieldId).setValueState("None");
            });
        },
        onDataMiningView: function () {
            this._clearFields()
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDataMiningView")
        },
        onSubmit: function() {
            var oLocationId = this.getView().byId("LocationIdInput");
            var oLocationDescription = this.getView().byId("LocationDescriptionInput");
            var oAllocatedMiningResource = this.getView().byId("AllocatedMiningResourceInput");
            var oTotalCost = this.getView().byId("TotalCostInput");
            var oPossibleMineralReport = this.getView().byId("PossibleMineralReportInput");
            var oNumberOfDrills = this.getView().byId("NumberOfDrillsInput");
            var oTypeOfMineral = this.getView().byId("TypeOfMineralInput");
  
            // Get values
            let sLocationId = oLocationId.getValue();
            let sLocationDescription = oLocationDescription.getValue().toUpperCase();
            let sAllocatedMiningResource = oAllocatedMiningResource.getValue().toUpperCase();
            let sTotalCost = oTotalCost.getValue();
            let sPossibleMineralReport = oPossibleMineralReport.getValue().toUpperCase();
            var sNumberOfDrills = oNumberOfDrills.getValue();
            let sTypeOfMineral = oTypeOfMineral.getValue().toUpperCase();

            sNumberOfDrills=parseInt(sNumberOfDrills)
         
            oLocationId.setValueState("None");
            oLocationDescription.setValueState("None");
            oAllocatedMiningResource.setValueState("None");
            oTotalCost.setValueState("None");
            oPossibleMineralReport.setValueState("None");
            oNumberOfDrills.setValueState("None");
            oTypeOfMineral.setValueState("None");
 
 
 
                let hasError = false;
                if (!sLocationId) {
                    oLocationId.setValueState("Error");
                    hasError = true;
                }
                if (!sLocationDescription) {
                    oLocationDescription.setValueState("Error");
                    hasError = true;
                }
                if (!sAllocatedMiningResource) {
                    oAllocatedMiningResource.setValueState("Error");
                    hasError = true;
                }
                if (!sTotalCost) {
                    oTotalCost.setValueState("Error");
                    hasError = true;
                }
                if (!sPossibleMineralReport) {
                    oPossibleMineralReport.setValueState("Error");
                    hasError = true;
                }
                if (!sNumberOfDrills) {
                    oNumberOfDrills.setValueState("Error");
                    hasError = true;
                }
                if (!sTypeOfMineral) {
                    oTypeOfMineral.setValueState("Error");
                    hasError = true;
                }
 
                if (hasError) {
                    MessageBox.error("Please fill in all the fields.");
                    return;
                }
            // var odate = new Date(sOdate).getTime();
            // let fdate = "/Date(" + odate + ")/";
  
            let payload = {
                "LocationId": sLocationId,
                "LocationDescription": sLocationDescription,
                "AllocatedMiningResource": sAllocatedMiningResource,
                "TotalCost": sTotalCost,
                "PossibleMineralReport": sPossibleMineralReport,
                "NumberOfDrills": sNumberOfDrills,
                "TypeOfMineral": sTypeOfMineral
            };
  
            let oModel = this.getOwnerComponent().getModel();
            let entity = "/YUKTI_MININGSet";
            let that = this
  
            oModel.create(entity, payload, {
                success: function() {
                    MessageBox.success("Entry published Successfully", {
                        onClose: function() {
                            that._clearFields()
                            let oRouter = that.getOwnerComponent().getRouter()
                            oRouter.navTo("RouteDataMiningView")
                            oLocationId.setValue("")
                            oLocationDescription.setValue("")
                            oAllocatedMiningResource.setValue("")
                            oTotalCost.setValue("")
                            oPossibleMineralReport.setValue("")
                            oNumberOfDrills.setValue("")
                            oTypeOfMineral.setValue("")
                            location.reload()
                        }
                    })
                },
                error: function(error) {
                    MessageBox.error("Error: " + error.message)
                }
                
            });
        }
    });
  });