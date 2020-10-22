require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery"
  ], function(Map, MapView, FeatureLayer, BasemapToggle, BasemapGallery) {
    var map = new Map({
      basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.805, 34.027], // longitude, latitude
      zoom: 13
    });

    var trailheadsLayer = new FeatureLayer({
        url:
          "https://services6.arcgis.com/vhDSkImOgoRe9GRT/arcgis/rest/services/MACMODS/FeatureServer/0"
    });
    // add layer      
    map.add(trailheadsLayer);

    // Trails feature layer (lines)
    var trailsLayer = new FeatureLayer({
    url:
      "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
    });
    // add layer
    map.add(trailsLayer, 0);
  
    // Parks and open spaces (polygons)
    var parksLayer = new FeatureLayer({
    url:
      "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
    });
    // add layer
    map.add(parksLayer, 0);

  });