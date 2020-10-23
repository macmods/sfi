require([
  // mapping
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  // widgets
  "esri/widgets/Legend",
], function (
  // mapping
  Map,
  MapView,
  FeatureLayer,
  // widgets
  Legend
) {
  // shipping lanes feature layer
  const shippingLanesLayer = new FeatureLayer ({
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/ShippingLanes_SCA/FeatureServer",
    visible: false
  });

  const restrictedZonesLayer = new FeatureLayer ({
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/ShippingLanes_SCA/FeatureServer",
    visible: false
  });

  const kelpProductivityLayer = new FeatureLayer ({
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/ussw11999_maxcanopy/FeatureServer",
    visible: false
  });

  const map = new Map({
    basemap: "topo-vector",
    layers: [kelpProductivityLayer, restrictedZonesLayer, shippingLanesLayer]
  });

  const view = new MapView ({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13,
  });

  // Toggle function of shipping lanes layer
  const shippingLanesLayerToggle = document.getElementById("shippingLanesLayer");
  shippingLanesLayerToggle.addEventListener("change", function () {
    shippingLanesLayer.visible = shippingLanesLayerToggle.checked;
  });

  // Toggle function of kelp productivity Layer
  const kelpProductivityLayerToggle = document.getElementById("kelpProductivityLayer");
  kelpProductivityLayerToggle.addEventListener("change", function () {
    kelpProductivityLayer.visible = kelpProductivityLayerToggle.checked;
  });

  // Toggle function of restricted zones layer
  const restrictedZonesLayerToggle = document.getElementById("restrictedZonesLayer");
  restrictedZonesLayerToggle.addEventListener("change", function () {
    restrictedZonesLayer.visible = restrictedZonesLayerToggle.checked;
  });

  view.when(function () {
    var legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: shippingLanesLayer,
          title: "shipping lanes",
        },
        {
          layer: kelpProductivityLayer,
          title: "kelp productivity",
        },
        {
          layer: restrictedZonesLayer,
          title: "restricted zones",
        },        
      ]
    });
    // Add widget to the bottom right corner of the view
    view.ui.add(legend, "bottom-right");
  });

  // TODO: ADD 6 Layers
  // 1. Kelp Productivity Map (B)
  // 2. Bathymetry (OC)
  // 3. Distance to Port (OC)
  // 4. Shipping Lanes (MSP)
  // 5. Danger Zones and Restricted Areas (MSP)
  // 6. MPA Inventory (MSP)
});