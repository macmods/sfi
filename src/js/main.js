//import { kelpProductivityLayerUrl, shippingLanesLayerUrl } from './config.js';

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
  // Kelp productivity layer
  const kelpProductivityLayer = new FeatureLayer({
    url: "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/ussw11999_maxcanopy/FeatureServer/0",
    visible: false
  });

  // Shipping lanes layer
  const shippingLanesLayer = new FeatureLayer({
    url: "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/ShippingLanes_SCA/FeatureServer/1",
    visible: false
  });

  // Danger zones and restricted areas layer
  const dangerZonesAndRestrictedAreasLayer = new FeatureLayer({
    url: "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/DangerZonesAndRestrictedAreas_SCA/FeatureServer/0",
    visible: false
  });

  // MPA inventory layer
  const mpaInventoryLayer = new FeatureLayer({
    url: "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/MPAInventory_SCA/FeatureServer/0",
    visible: false
  });

  const map = new Map({
    basemap: "topo-vector",
    layers: [kelpProductivityLayer, shippingLanesLayer, dangerZonesAndRestrictedAreasLayer, mpaInventoryLayer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13
  });

  // Toggle function of kelp productivity layer
  const kelpProductivityLayerToggle = document.getElementById("kelpProductivityLayer");
  kelpProductivityLayerToggle.addEventListener("change", function () {
    kelpProductivityLayer.visible = kelpProductivityLayerToggle.checked;
  });

  // Toggle function of shipping lanes layer
  const shippingLanesLayerToggle = document.getElementById("shippingLanesLayer");
  shippingLanesLayerToggle.addEventListener("change", function () {
    shippingLanesLayer.visible = shippingLanesLayerToggle.checked;
  });

  // Toggle function of danger zones and restricted areas layer
  const dangerZonesAndRestrictedAreasLayerToggle = document.getElementById("dangerZonesAndRestrictedAreasLayer");
  dangerZonesAndRestrictedAreasLayerToggle.addEventListener("change", function () {
    dangerZonesAndRestrictedAreasLayer.visible = dangerZonesAndRestrictedAreasLayerToggle.checked;
  });

  // Toggle function of MPA inventory layer
  const mpaInventoryLayerToggle = document.getElementById("mpaInventoryLayer");
  mpaInventoryLayerToggle.addEventListener("change", function () {
    mpaInventoryLayer.visible = mpaInventoryLayerToggle.checked;
  });

  view.when(function () {
    var legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: kelpProductivityLayer,
          title: "Kelp Productivity"
        },
        {
          layer: shippingLanesLayer,
          title: "Shipping Lanes"
        },
        {
          layer: dangerZonesAndRestrictedAreasLayer,
          title: "Danger Zones and Restricted Areas"
        },
        {
          layer: mpaInventoryLayer,
          title: "MPA Inventory"
        }
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
