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
import { referenceScale, kelpProductivityRenderer } from "./renderer.js";

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
   * Declaration zone for data layers
   ****************************************************/
  var kelpProductivityLayer;
  var bathymetryLayer;
  var shippingLanesLayer;
  var dangerZonesAndRestrictedAreasLayer;
  var mpaInventoryLayer;
  var principalPortsLayer;
  var federalAndStateWatersLayer;
  var resultsLayer;

  /****************************************************
   * Declaration zone for the map and the view
   ****************************************************/
  var webmap;
  var view;

  initiateDataLayersAndMapViewer();
  addWidgetsForTheMap();
  addCalculateSFIFeature();
  addReportSFIFeature();

  // Create a locator task using the world geocoding service
  const locatorTask = new Locator({
    url: locatorTaskUrl,
  });

  function initiateDataLayersAndMapViewer() {
    initiateDataLayers();
    addToggleFunctionsToDataLayers();
    initiateMapViewer();

    function initiateDataLayers() {
      // Kelp productivity layer
      kelpProductivityLayer = new FeatureLayer({
        url: kelpProductivityLayerUrl,
        visible: false,
        renderer: kelpProductivityRenderer,
        definitionExpression: "(Maximum_An > 0)",
        popupTemplate: kelpProductivityPopupTemplate,
      });

      // Bathymetry layer
      bathymetryLayer = new FeatureLayer({
        url: bathymetryLayerUrl,
        visible: false,
        // renderer: bathymetryRenderer,
        popupTemplate: bathymetryPopupTemplate,
      });

      // Shipping lanes layer
      shippingLanesLayer = new FeatureLayer({
        url: shippingLanesLayerUrl,
        visible: false,
        definitionExpression: "(OBJECTID < 3 OR " + "OBJECTID > 4)",
        popupTemplate: shippingLanesPopupTemplate,
      });

      // Danger zones and restricted areas layer
      dangerZonesAndRestrictedAreasLayer = new FeatureLayer({
        url: dangerZonesAndRestrictedAreasLayerUrl,
        visible: false,
        // renderer: dangerZonesAndRestrictedAreasRenderer,
        popupTemplate: dangerZonesAndRestrictedAreasPopupTemplate,
      });

      // MPA inventory layer
      mpaInventoryLayer = new FeatureLayer({
        url: mpaInventoryLayerUrl,
        visible: false,
        popupTemplate: mpaInventoryPopupTeamplate,
      });

      // Principal ports layer
      principalPortsLayer = new FeatureLayer({
        url: principalPortsLayerUrl,
        visible: false,
        popupTemplate: principalPortsPopupTemplate,
      });

      // Federal and state waters layer
      federalAndStateWatersLayer = new FeatureLayer({
        url: federalAndStateWatersLayerUrl,
        visible: false,
        popupTemplate: federalAndStateWatersPopupTemplate,
      });

      resultsLayer = new GraphicsLayer();
    }

    function addToggleFunctionsToDataLayers() {
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
      const mpaInventoryLayerToggle = document.getElementById(
        "mpaInventoryLayer"
      );
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
    }

    function initiateMapViewer() {
      webmap = new WebMap({
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
          resultsLayer,
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
      webmap.layers.reorder(resultsLayer, 7);

      // Set minimum scale
      kelpProductivityLayer.minScale = 0;
      bathymetryLayer.minScale = 0;

      view = new MapView({
        container: "viewDiv",
        map: webmap,
        center: [-118.805, 34.027], // longitude, latitude
        zoom: 7,
        scale: referenceScale * 4,
      });
    }
  }

  function addWidgetsForTheMap() {
    addLegendWidget();
    addSearchWidget();
    addBookmarksWidget();
    addMouseCoordinatesWidget();
    addGeometryQueryWidget();
    addSummaryReportWidget();
    addDistanceMeasurementWidget();
    function addLegendWidget() {
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
    }

    function addSearchWidget() {
      // Widget #2: Search
      const searchWidget = new Search({ view });
      view.ui.add(searchWidget, "top-right");
    }

    function addBookmarksWidget() {
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
    }

    function addMouseCoordinatesWidget() {
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
    }

    function addGeometryQueryWidget() {
      // widget #5: Geometry Query
      window.view = view;
      view.ui.add([queryDiv], "bottom-left");
    }

    function addSummaryReportWidget() {
      view.ui.add([resultDiv], "top-right");
    }

    function addDistanceMeasurementWidget() {
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

      document
        .getElementById("areaButton")
        .addEventListener("click", function () {
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
    }
  }

  /********************************************************************************
   *                         Under construction: Calculate SFI
   * ******************************************************************************/
  function addCalculateSFIFeature() {
    var minOCDepth = 20;
    var maxOcDepth = 500;
    var FarmFactor = 0.5;
    var OCFactor = 0.5;

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

    const weightingFactorSlider = new Slider({
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

    minOCDepthSlider.on("thumb-drag", function (event) {
      minOCDepth = event.value;
    });

    maxOCDepthSlider.on("thumb-drag", function (event) {
      maxOcDepth = event.value;
    });

    weightingFactorSlider.on("thumb-drag", function (event) {
      FarmFactor = event.value;
      OCFactor = 1 - FarmFactor;
    });

    const querySFI = document.getElementById("query-sfi");

    querySFI.addEventListener("click", function () {
      resultsLayer.removeAll();
      const querySizeLimit = 5000;
      const maxProductivity = 4;

      for (let i = 1; i < 50000; i += querySizeLimit) {
        queryData(i, querySizeLimit).then(displayResults);
      }

      function queryData(index, querySizeLimit) {
        const query = kelpProductivityLayer.createQuery();
        query.start = index;
        query.num = querySizeLimit;
        return kelpProductivityLayer.queryFeatures(query);
      }
      function displayResults(results) {
        const features = results.features.map(function (graphic) {
          let biomass = graphic.attributes.Maximum_An;
          let bathymetry = graphic.attributes.Depth;
          let sfi = 0;
          const Bn = biomass / maxProductivity;
          const OCz = 1 - Math.pow((bathymetry - minOCDepth) / maxOcDepth, 2);
          if (bathymetry >= minOCDepth && bathymetry <= maxOcDepth) {
            sfi = FarmFactor * Bn + OCFactor * OCz;
          }
          graphic.attributes = {
            Biomass: biomass,
            Bathymetry: bathymetry,
            SFI: sfi,
          };
          graphic.symbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            size: 1,
            color: "green",
          };
          return graphic;
        });
        resultsLayer.addMany(features);
      }
    });

    const clearSFI = document.getElementById("clear-report");
    clearSFI.addEventListener("click", function () {
      view.when(function () {
        resultsLayer.removeAll();
      });
    });
  }

  /********************************************************************************
   *                         Under construction: Report SFI
   * ******************************************************************************/
  function addReportSFIFeature() {
    // add a GraphicsLayer for the sketches and the buffer
    const sketchLayer = new GraphicsLayer();
    view.map.addMany([sketchLayer]);

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
        // make summary result pop up visible
        resultDiv.style.display = "block";
      }
    });

    sketchViewModel.on("update", function (event) {
      if (event.state === "complete") {
        sketchGeometry = event.graphics[0].geometry;
        // make summary result pop up visible
        resultDiv.style.display = "block";
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
      // make summary result pop up invisible
      resultDiv.style.display = "none";
    }
  }
});
