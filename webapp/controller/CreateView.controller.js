sap.ui.define([
    "./BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
  ],
  
  function(BaseController, Controller, MessageBox) {
    "use strict";
  
    return Controller.extend("app.dataminingb27.controller.CreateView", {
        onInit: function() {

        },
        onDataMiningView: function () {
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
            let sLocationDescription = oLocationDescription.getValue();
            let sAllocatedMiningResource = oAllocatedMiningResource.getValue();
            let sTotalCost = oTotalCost.getValue();
            let sPossibleMineralReport = oPossibleMineralReport.getValue();
            var sNumberOfDrills = oNumberOfDrills.getValue();
            let sTypeOfMineral = oTypeOfMineral.getValue();

            sNumberOfDrills=parseInt(sNumberOfDrills)


  
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
                            let oRouter = that.getOwnerComponent().getRouter()
                            oRouter.navTo("RouteDataMiningView")
                            oLocationId.setValue("")
                            oLocationDescription.setValue("")
                            oAllocatedMiningResource.setValue("")
                            oTotalCost.setValue("")
                            oPossibleMineralReport.setValue("")
                            oNumberOfDrills.setValue("")
                            oTypeOfMineral.setValue("")
  
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