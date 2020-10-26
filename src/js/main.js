//import { kelpProductivityLayerUrl, shippingLanesLayerUrl, dangerZonesAndRestrictedAreasLayerUrl, mpaInventoryLayerUrl } from './config.js';

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
  // Display kelp productivity with the heat map mode
  const renderer = {
    type: "heatmap",
    colorStops: [
      { color: "rgba(63, 40, 102, 0)", ratio: 0 },
      { color: "#472b77", ratio: 0.083 },
      { color: "#4e2d87", ratio: 0.166 },
      { color: "#563098", ratio: 0.249 },
      { color: "#5d32a8", ratio: 0.332 },
      { color: "#6735be", ratio: 0.415 },
      { color: "#7139d4", ratio: 0.498 },
      { color: "#7b3ce9", ratio: 0.581 },
      { color: "#853fff", ratio: 0.664 },
      { color: "#a46fbf", ratio: 0.747 },
      { color: "#c29f80", ratio: 0.83 },
      { color: "#e0cf40", ratio: 0.913 },
      { color: "#ffff00", ratio: 1 }
    ],
    maxPixelIntensity: 10,
    minPixelIntensity: 0
  };
  // Kelp productivity layer
  const kelpProductivityLayer = new FeatureLayer({
    url: "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/ussw11999_maxcanopy/FeatureServer/0",
    visible: false,
    renderer: renderer
  });

  /*
  // Bathymetry layer
  const bathymetryLayer = new FeatureLayer({
    url: "https://oceans2.arcgis.com/arcgis/rest/services/Seafloor_Bathymetry/ImageServer",
    visible: false
  });
  */

  // Federal and state waters layer
  const federalAndStateWatersLayer = new FeatureLayer({
    url: "https://services7.arcgis.com/4c8njmg1eMIbzYXM/ArcGIS/rest/services/FederalAndStateWaters/FeatureServer/0",
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
    layers: [kelpProductivityLayer, /*bathymetryLayer,*/ federalAndStateWatersLayer, shippingLanesLayer, dangerZonesAndRestrictedAreasLayer, mpaInventoryLayer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 9
  });

  // Toggle function of kelp productivity layer
  const kelpProductivityLayerToggle = document.getElementById("kelpProductivityLayer");
  kelpProductivityLayerToggle.addEventListener("change", function () {
    kelpProductivityLayer.visible = kelpProductivityLayerToggle.checked;
  });

  /*
  // Toggle function of bathymetry layer
  const bathymetryLayerToggle = document.getElementById("bathymetryLayer");
  bathymetryLayerToggle.addEventListener("change", function () {
    bathymetryLayer.visible = bathymetryLayerToggle.checked;
  });
  */

  // Toggle function of federal and state waters layer
  const federalAndStateWatersLayerToggle = document.getElementById("federalAndStateWatersLayer");
  federalAndStateWatersLayerToggle.addEventListener("change", function () {
    federalAndStateWatersLayer.visible = federalAndStateWatersLayerToggle.checked;
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
        /*{
          layer: bathymetryLayer,
          title: "Bathymetry"
        },*/
        {
          layer: federalAndStateWatersLayer,
          title: "Federal and State Waters"
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
