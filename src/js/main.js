//import { kelpProductivityLayerUrl, shippingLanesLayerUrl, dangerZonesAndRestrictedAreasLayerUrl, mpaInventoryLayerUrl } from './config.js';

require([
  // mapping
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  // widgets
  "esri/widgets/Legend",
  "esri/widgets/Search",
  "esri/widgets/Expand",
], function (
  // mapping
  Map,
  MapView,
  FeatureLayer,
  // widgets
  Legend,
  Search,
  Expand
) {
  /****************************************************
   * Initialize the map
   ****************************************************/
  // Display kelp productivity with simple renderer
  const referenceScale = 900000;

  const kelpProductivityRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-marker",
      size: 6,
      color: "black",
      outline: {
        width: 0,
        color: "white",
      },
    },
    visualVariables: [
      {
        type: "size",
        field: "biomass",
        minDataValue: 0,
        maxDataValue: 5.5,
        legendOptions: {
          showLegend: false,
        },
        minSize: {
          type: "size",
          valueExpression: "$view.scale",
          // adjust the min size by scale
          stops: [
            { value: referenceScale, size: 5 },
            { value: referenceScale * 2, size: 4 },
            { value: referenceScale * 4, size: 3 },
            { value: referenceScale * 6, size: 2 },
          ],
        },
        maxSize: {
          type: "size",
          valueExpression: "$view.scale",
          // adjust the max size by scale
          stops: [
            { value: referenceScale, size: 35 },
            { value: referenceScale * 2, size: 20 },
            { value: referenceScale * 4, size: 8 },
            { value: referenceScale * 6, size: 2 },
          ],
        },
      },
      {
        type: "color",
        field: "biomass",
        stops: [
          { value: 0.0, color: "#BFF3C6", opacity: 0.15 },
          { value: 1.5, color: "#73D191", opacity: 0.15 },
          { value: 3.0, color: "#27B05D", opacity: 0.15 },
          { value: 4.5, color: "#1C7F43", opacity: 0.15 },
          { value: 5.5, color: "#124F29", opacity: 0.15 },
        ],
      },
    ],
  };

  // Kelp productivity layer
  const kelpProductivityLayer = new FeatureLayer({
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/ussw11999_maxcanopy/FeatureServer/0",
    visible: false,
    renderer: kelpProductivityRenderer,
    minScale: 9000000, // map scale at which layer becomes invisible
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
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/ArcGIS/rest/services/FederalAndStateWaters/FeatureServer/0",
    visible: false,
  });

  // Shipping lanes layer
  const shippingLanesLayer = new FeatureLayer({
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/ShippingLanes_SCA/FeatureServer/1",
    visible: false,
    definitionExpression: "(OBJECTID < 3 OR " + "OBJECTID > 4)",
  });

  // Danger zones and restricted areas layer
  const dangerZonesAndRestrictedAreasLayer = new FeatureLayer({
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/DangerZonesAndRestrictedAreas_SCA/FeatureServer/0",
    visible: false,
  });

  // MPA inventory layer
  const mpaInventoryLayer = new FeatureLayer({
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/MPAInventory_SCA/FeatureServer/0",
    visible: false,
    definitionExpression:
      "(OBJECTID < 20 OR " +
      "OBJECTID > 49 AND " +
      "OBJECTID < 54 OR " +
      "OBJECTID > 54 AND " +
      "OBJECTID < 94)",
  });

  const map = new Map({
    basemap: "topo-vector",
    layers: [
      kelpProductivityLayer,
      /*bathymetryLayer,*/ federalAndStateWatersLayer,
      shippingLanesLayer,
      dangerZonesAndRestrictedAreasLayer,
      mpaInventoryLayer,
    ],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 9,
    scale: referenceScale * 4,
  });

  /****************************************************
   * Initialize the listeners
   ****************************************************/
  // Toggle function of kelp productivity layer
  const kelpProductivityLayerToggle = document.getElementById(
    "kelpProductivityLayer"
  );
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
  const federalAndStateWatersLayerToggle = document.getElementById(
    "federalAndStateWatersLayer"
  );
  federalAndStateWatersLayerToggle.addEventListener("change", function () {
    federalAndStateWatersLayer.visible =
      federalAndStateWatersLayerToggle.checked;
  });

  // Toggle function of shipping lanes layer
  const shippingLanesLayerToggle = document.getElementById(
    "shippingLanesLayer"
  );
  shippingLanesLayerToggle.addEventListener("change", function () {
    shippingLanesLayer.visible = shippingLanesLayerToggle.checked;
  });

  // Toggle function of danger zones and restricted areas layer
  const dangerZonesAndRestrictedAreasLayerToggle = document.getElementById(
    "dangerZonesAndRestrictedAreasLayer"
  );
  dangerZonesAndRestrictedAreasLayerToggle.addEventListener(
    "change",
    function () {
      dangerZonesAndRestrictedAreasLayer.visible =
        dangerZonesAndRestrictedAreasLayerToggle.checked;
    }
  );

  // Toggle function of MPA inventory layer
  const mpaInventoryLayerToggle = document.getElementById("mpaInventoryLayer");
  mpaInventoryLayerToggle.addEventListener("change", function () {
    mpaInventoryLayer.visible = mpaInventoryLayerToggle.checked;
  });

  /****************************************************
   * Define the UI
   ****************************************************/
  // Widget #1: Legend
  view.when(function () {
    const legend = new Expand({
      content: new Legend({
        view: view,
        layerInfos: [
          {
            layer: kelpProductivityLayer,
            title: "Kelp Productivity",
          },
          /*{
            layer: bathymetryLayer,
            title: "Bathymetry"
          },*/
          {
            layer: federalAndStateWatersLayer,
            title: "Federal and State Waters",
          },
          {
            layer: shippingLanesLayer,
            title: "Shipping Lanes",
          },
          {
            layer: dangerZonesAndRestrictedAreasLayer,
            title: "Danger Zones and Restricted Areas",
          },
          {
            layer: mpaInventoryLayer,
            title: "MPA Inventory",
          },
        ],
      }),
      view: view,
      expanded: true,
    });
    view.ui.add(legend, "top-left");
  });

  // widget #2: Search
  const searchWidget = new Search({ view });
  view.ui.add(searchWidget, "top-right");

  // TODO: ADD 6 Layers
  // 1. Kelp Productivity Map (B)
  // 2. Bathymetry (OC)
  // 3. Distance to Port (OC)
  // 4. Shipping Lanes (MSP)
  // 5. Danger Zones and Restricted Areas (MSP)
  // 6. MPA Inventory (MSP)
});
