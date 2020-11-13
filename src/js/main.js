import {
  kelpProductivityLayerUrl,
  bathymetryLayerUrl,
  shippingLanesLayerUrl,
  dangerZonesAndRestrictedAreasLayerUrl,
  mpaInventoryLayerUrl,
  principalPortsLayerUrl,
  federalAndStateWatersLayerUrl,
  locatorTaskUrl,
} from "./config.js";
import {
  kelpProductivityPopupTemplate,
  bathymetryPopupTemplate,
  federalAndStateWatersPopupTemplate,
  shippingLanesPopupTemplate,
  dangerZonesAndRestrictedAreasPopupTemplate,
  mpaInventoryPopupTeamplate,
  principalPortsPopupTemplate,
} from "./popup_template.js";
import {
  referenceScale,
  kelpProductivityRenderer,
  // bathymetryRenderer,
  // dangerZonesAndRestrictedAreasRenderer,
} from "./renderer.js";

require([
  // mapping
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/geometry/geometryEngine",
  "esri/core/promiseUtils",
  // widgets
  "esri/widgets/Legend",
  "esri/widgets/Search",
  "esri/widgets/Expand",
  "esri/tasks/Locator",
  "esri/widgets/Bookmarks",
  "esri/widgets/Slider",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/Sketch/SketchViewModel",
], function (
  // mapping
  WebMap,
  MapView,
  FeatureLayer,
  GraphicsLayer,
  Graphic,
  geometryEngine,
  promiseUtils,
  // widgets
  Legend,
  Search,
  Expand,
  Locator,
  Bookmarks,
  Slider,
  DistanceMeasurement2D,
  AreaMeasurement2D,
  SketchViewModel
) {
  /****************************************************
   * Initialize the map
   ****************************************************/
  // Kelp productivity layer
  const kelpProductivityLayer = new FeatureLayer({
    url: kelpProductivityLayerUrl,
    visible: false,
    renderer: kelpProductivityRenderer,
    definitionExpression: "(Maximum_An > 0)",
    popupTemplate: kelpProductivityPopupTemplate,
  });

  // Bathymetry layer
  const bathymetryLayer = new FeatureLayer({
    url: bathymetryLayerUrl,
    visible: false,
    // renderer: bathymetryRenderer,
    popupTemplate: bathymetryPopupTemplate,
  });

  // Shipping lanes layer
  const shippingLanesLayer = new FeatureLayer({
    url: shippingLanesLayerUrl,
    visible: false,
    definitionExpression: "(OBJECTID < 3 OR " + "OBJECTID > 4)",
    popupTemplate: shippingLanesPopupTemplate,
  });

  // Danger zones and restricted areas layer
  const dangerZonesAndRestrictedAreasLayer = new FeatureLayer({
    url: dangerZonesAndRestrictedAreasLayerUrl,
    visible: false,
    // renderer: dangerZonesAndRestrictedAreasRenderer,
    popupTemplate: dangerZonesAndRestrictedAreasPopupTemplate,
  });

  // MPA inventory layer
  const mpaInventoryLayer = new FeatureLayer({
    url: mpaInventoryLayerUrl,
    visible: false,
    // definitionExpression:
    //   "(OBJECTID < 20 OR " +
    //   "OBJECTID > 49 AND " +
    //   "OBJECTID < 54 OR " +
    //   "OBJECTID > 54 AND " +
    //   "OBJECTID < 94)",
    popupTemplate: mpaInventoryPopupTeamplate,
  });

  // Principal ports layer
  const principalPortsLayer = new FeatureLayer({
    url: principalPortsLayerUrl,
    visible: false,
    popupTemplate: principalPortsPopupTemplate,
  });

  // Federal and state waters layer
  const federalAndStateWatersLayer = new FeatureLayer({
    url: federalAndStateWatersLayerUrl,
    visible: false,
    popupTemplate: federalAndStateWatersPopupTemplate,
  });

  // Create a locator task using the world geocoding service
  const locatorTask = new Locator({
    url: locatorTaskUrl,
  });

  const webmap = new WebMap({
    portalItem: {
      id: "ab809d7d499b4ba9b7c87dbdefc4bbf7",
    },
    layers: [
      kelpProductivityLayer,
      bathymetryLayer,
      shippingLanesLayer,
      dangerZonesAndRestrictedAreasLayer,
      mpaInventoryLayer,
      principalPortsLayer,
      federalAndStateWatersLayer,
    ],
  });

  // Reorder layers - sink federal and state waters and bathymetry layers to the bottom
  webmap.layers.reorder(bathymetryLayer, 0);
  webmap.layers.reorder(federalAndStateWatersLayer, 1);
  webmap.layers.reorder(kelpProductivityLayer, 2);
  webmap.layers.reorder(mpaInventoryLayer, 3);
  webmap.layers.reorder(dangerZonesAndRestrictedAreasLayer, 4);
  webmap.layers.reorder(shippingLanesLayer, 5);
  webmap.layers.reorder(principalPortsLayer, 6);

  // Set minimum scale
  kelpProductivityLayer.minScale = 0;
  bathymetryLayer.minScale = 0;

  const view = new MapView({
    container: "viewDiv",
    map: webmap,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 7,
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

  // Toggle function of bathymetry layer
  const bathymetryLayerToggle = document.getElementById("bathymetryLayer");
  bathymetryLayerToggle.addEventListener("change", function () {
    bathymetryLayer.visible = bathymetryLayerToggle.checked;
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

  // Toggle function of principal ports layer
  const principalPortsLayerToggle = document.getElementById(
    "principalPortsLayer"
  );
  principalPortsLayerToggle.addEventListener("change", function () {
    principalPortsLayer.visible = principalPortsLayerToggle.checked;
  });

  // Toggle function of federal and state waters layer
  const federalAndStateWatersLayerToggle = document.getElementById(
    "federalAndStateWatersLayer"
  );
  federalAndStateWatersLayerToggle.addEventListener("change", function () {
    federalAndStateWatersLayer.visible =
      federalAndStateWatersLayerToggle.checked;
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
            title: "Kelp Productivity (Biomass in kilogram-dry)",
          },
          {
            layer: bathymetryLayer,
            title: "Bathymetry (Depth in meters)",
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
            title: "Marine Protected Area Inventory",
          },
          {
            layer: principalPortsLayer,
            title: "Principal Ports",
          },
          {
            layer: federalAndStateWatersLayer,
            title: "Federal and State Waters",
          },
        ],
      }),
      view: view,
      expanded: true,
    });
    view.ui.add(legend, "top-left");
  });

  // Widget #2: Search
  const searchWidget = new Search({ view });
  view.ui.add(searchWidget, "top-right");

  // widget #3: Bookmarks
  const bookmarks = new Bookmarks({
    view: view,
    // allows bookmarks to be added, edited, or deleted
    editingEnabled: true,
  });
  const bkExpand = new Expand({
    view: view,
    content: bookmarks,
    expanded: false,
  });
  view.ui.add(bkExpand, "top-left");

  // widget #4: Mouse coordinates
  const coordsWidget = document.getElementById("coordsWidget");
  view.ui.add(coordsWidget, "bottom-right");

  function showCoordinates(pt) {
    var coords =
      "Lat/Lon: " +
      pt.latitude.toFixed(3) +
      ", " +
      pt.longitude.toFixed(3) +
      " | Zoom: " +
      view.zoom;
    coordsWidget.innerHTML = coords;
  }

  view.watch(["stationary"], function () {
    showCoordinates(view.center);
  });

  view.on(["pointer-down", "pointer-move"], function (evt) {
    showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
  });

  // widget #5: Geometry Query
  window.view = view;

  // add a GraphicsLayer for the sketches and the buffer
  const sketchLayer = new GraphicsLayer();
  view.map.addMany([sketchLayer]);

  webmap.load().then(function () {
    queryDiv.style.display = "block";
  });
  view.ui.add([queryDiv], "bottom-left");

  // use SketchViewModel to draw polygons that are used as a query
  let sketchGeometry = null;
  const sketchViewModel = new SketchViewModel({
    layer: sketchLayer,
    defaultUpdateOptions: {
      tool: "reshape",
      toggleToolOnClick: false,
    },
    view: view,
    defaultCreateOptions: { hasZ: false },
  });

  sketchViewModel.on("create", function (event) {
    if (event.state === "complete") {
      sketchGeometry = event.graphic.geometry;
    }
  });

  sketchViewModel.on("update", function (event) {
    if (event.state === "complete") {
      sketchGeometry = event.graphics[0].geometry;
    }
  });

  // draw geometry buttons - use the selected geometry to sktech
  document
    .getElementById("point-geometry-button")
    .addEventListener("click", geometryButtonsClickHandler);
  document
    .getElementById("polygon-geometry-button")
    .addEventListener("click", geometryButtonsClickHandler);
  function geometryButtonsClickHandler(event) {
    const geometryType = event.target.value;
    clearGeometry();
    sketchViewModel.create(geometryType);
  }

  // Clear the geometry and set the default renderer
  document
    .getElementById("clearGeometry")
    .addEventListener("click", clearGeometry);

  // Clear the geometry and set the default renderer
  function clearGeometry() {
    sketchGeometry = null;
    sketchViewModel.cancel();
    sketchLayer.removeAll();
  }

  // widget #6: Distance measurement
  view.ui.add("measureBar", "bottom-left");

  var activeWidget = null;
  document
    .getElementById("distanceButton")
    .addEventListener("click", function () {
      setActiveWidget(null);
      if (!this.classList.contains("active")) {
        setActiveWidget("distance");
      } else {
        setActiveButton(null);
      }
    });

  document.getElementById("areaButton").addEventListener("click", function () {
    setActiveWidget(null);
    if (!this.classList.contains("active")) {
      setActiveWidget("area");
    } else {
      setActiveButton(null);
    }
  });

  function setActiveWidget(type) {
    switch (type) {
      case "distance":
        activeWidget = new DistanceMeasurement2D({
          view: view,
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.newMeasurement();

        view.ui.add(activeWidget, "bottom-left");
        setActiveButton(document.getElementById("distanceButton"));
        break;
      case "area":
        activeWidget = new AreaMeasurement2D({
          view: view,
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.newMeasurement();

        view.ui.add(activeWidget, "bottom-left");
        setActiveButton(document.getElementById("areaButton"));
        break;
      case null:
        if (activeWidget) {
          view.ui.remove(activeWidget);
          activeWidget.destroy();
          activeWidget = null;
        }
        break;
    }
  }

  function setActiveButton(selectedButton) {
    // focus the view to activate keyboard shortcuts for sketching
    view.focus();
    var elements = document.getElementsByClassName("active");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }

  /***  User Input SFI feature   ***/
  const minOCDepthSlider = new Slider({
    container: "minOCDepthSlider",
    min: 10,
    max: 10000,
    steps: 10,
    values: [5000],
    visibleElements: {
      labels: true,
      rangeLabels: true,
    },
  });

  const maxOCDepthSlider = new Slider({
    container: "maxOCDepthSlider",
    min: 10,
    max: 10000,
    steps: 10,
    values: [5000],
    visibleElements: {
      labels: true,
      rangeLabels: true,
    },
  });

  const maxOCToPortSlider = new Slider({
    container: "maxOCToPortSlider",
    min: 1,
    max: 10000,
    steps: 10,
    values: [5000],
    visibleElements: {
      labels: true,
      rangeLabels: true,
    },
  });

  const weightingFactor = new Slider({
    container: "weightingFactor",
    min: 0,
    max: 1,
    steps: 0.01,
    values: [0.5],
    visibleElements: {
      labels: true,
      rangeLabels: true,
    },
  });

  // TODO: ADD 7 Layers
  // 1. Kelp Productivity Map (B)
  // 2. Bathymetry (OC)
  // 3. Distance to Port (OC)
  // 4. Shipping Lanes (MSP)
  // 5. Danger Zones and Restricted Areas (MSP)
  // 6. MPA Inventory (MSP)
  // 7. Federal and State Waters (MSP)
});
