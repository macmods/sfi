require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
], function (Map, MapView, FeatureLayer) {
  var map = new Map({
    basemap: "topo-vector",
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13,
  });

  // Trails feature layer (lines)
  var trailsLayer = new FeatureLayer({
    url:
      "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
  });
  // add layer
  map.add(trailsLayer, 0);

  // Parks and open spaces (polygons)
  var parksLayer = new FeatureLayer({
    url:
      "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
    visible: false,
  });
  // add layer
  map.add(parksLayer, 0);

  var parksLayerToggle = document.getElementById("streetsLayer");

  /*****************************************************************
   * The visible property on the layer can be used to toggle the
   * layer's visibility in the view. When the visibility is turned off
   * the layer is still part of the map, which means you can access
   * its properties and perform analysis even though it isn't visible.
   *******************************************************************/
  parksLayerToggle.addEventListener("change", function () {
    parksLayer.visible = parksLayerToggle.checked;
  });
});
