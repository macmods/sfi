/**********************************************************************************
 * This DataLayers.js file contains the accessors for each data layer used for    *
 * querying                                                                       *    
 **********************************************************************************/

class DataLayers {
    federalAreas = [];
    stateAreas = [];
    MPAInventory = [];
    shippingLanes = [];
    restrictedZones = [];
    constructor() {}
    setFederalAreas(federalAreas) {
      this.federalAreas = federalAreas;
    }
    setStateAreas(stateAreas) {
      this.stateAreas = stateAreas;
    }
    setMPAInventory(MPAInventory) {
      this.MPAInventory = MPAInventory;
    }
    setShippingLanes(shippingLanes) {
      this.shippingLanes = shippingLanes;
    }
    setRestrictedZones(restrictedZones) {
      this.restrictedZones = restrictedZones;
    }
  
    getFederalAreas() {
      return this.federalAreas;
    }
    getStateAreas() {
      return this.stateAreas;
    }
    getMPAInventory() {
      return this.MPAInventory;
    }
    getShippingLanes() {
      return this.shippingLanes;
    }
    getRestrictedZones() {
      return this.restrictedZones;
    }
  }
  
  export { DataLayers };
  