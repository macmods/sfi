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
  // Trails feature layer (lines)
  const trailsLayer = new FeatureLayer({
    url:
      "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
    visible: false,
  });

  // Parks and open spaces (polygons)
  const parksLayer = new FeatureLayer({
    url:
      "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
    visible: false,
  });

  const map = new Map({
    basemap: "topo-vector",
    layers: [trailsLayer, parksLayer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13,
  });

  // Toggle function of Layer 1
  const parksLayerToggle = document.getElementById("parksLayer");
  parksLayerToggle.addEventListener("change", function () {
    parksLayer.visible = parksLayerToggle.checked;
  });

  // Toggle function of Layer 2
  const trailsLayerToggle = document.getElementById("trailsLayer");
  trailsLayerToggle.addEventListener("change", function () {
    trailsLayer.visible = trailsLayerToggle.checked;
  });

  view.when(function () {
    var legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: trailsLayer,
          title: "Trails",
        },
        {
          layer: parksLayer,
          title: "Parks",
        },
      ],
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
