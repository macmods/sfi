import {
  kelpProductivityLayerUrl,
  bathymetryLayerUrl,
  shippingLanesLayerUrl,
  dangerZonesAndRestrictedAreasLayerUrl,
  mpaInventoryLayerUrl,
  principalPortsLayerUrl,
  federalAndStateWatersLayerUrl,
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
  principalPortsRenderer,
  bathymetryRenderer,
} from "./renderer.js";
import { DataLayers } from "./DataLayers.js";

require([
  // mapping
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/geometry/Polygon",
  "esri/geometry/geometryEngine",
  "esri/geometry/support/geodesicUtils",
  "esri/geometry/support/webMercatorUtils",
  "esri/core/promiseUtils",
  "esri/core/watchUtils",
  "esri/smartMapping/statistics/histogram",
  "esri/smartMapping/statistics/summaryStatistics",
  // widgets
  "esri/widgets/Legend",
  "esri/widgets/Search",
  "esri/widgets/Expand",
  "esri/widgets/Bookmarks",
  "esri/widgets/Slider",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/Sketch/SketchViewModel",
  "esri/widgets/Histogram",
  "esri/widgets/Print",
], function (
  // mapping
  WebMap,
  MapView,
  FeatureLayer,
  GraphicsLayer,
  Polygon,
  geometryEngine,
  geodesicUtils,
  webMercatorUtils,
  promiseUtils,
  watchUtils,
  histogram,
  summaryStatistics,
  // widgets
  Legend,
  Search,
  Expand,
  Bookmarks,
  Slider,
  DistanceMeasurement2D,
  AreaMeasurement2D,
  SketchViewModel,
  Histogram,
  Print
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

  /****************************************************************
   * Declaration zone for bookmark and legend widgets and handles
   ****************************************************************/
  var legendExpand;
  var bookmarkExpand;
  var legendHandle;
  var bookmarkHandle;

  initiateDataLayersAndMapViewer();
  addWidgetsForTheMap();
  addSFIFeatures();

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
        renderer: bathymetryRenderer,
        popupTemplate: bathymetryPopupTemplate,
      });

      // Shipping lanes layer
      shippingLanesLayer = new FeatureLayer({
        url: shippingLanesLayerUrl,
        visible: false,
        definitionExpression:
          "((FID < 3 OR " + "FID > 4) AND THEMELAYER NOT LIKE '%Avoided%')",
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
        renderer: principalPortsRenderer,
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
        legendExpand.expanded = true;
      });

      // Toggle function of bathymetry layer
      const bathymetryLayerToggle = document.getElementById("bathymetryLayer");
      bathymetryLayerToggle.addEventListener("change", function () {
        bathymetryLayer.visible = bathymetryLayerToggle.checked;
        legendExpand.expanded = true;
      });

      // Toggle function of shipping lanes layer
      const shippingLanesLayerToggle = document.getElementById(
        "shippingLanesLayer"
      );
      shippingLanesLayerToggle.addEventListener("change", function () {
        shippingLanesLayer.visible = shippingLanesLayerToggle.checked;
        legendExpand.expanded = true;
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
          legendExpand.expanded = true;
        }
      );

      // Toggle function of MPA inventory layer
      const mpaInventoryLayerToggle = document.getElementById(
        "mpaInventoryLayer"
      );
      mpaInventoryLayerToggle.addEventListener("change", function () {
        mpaInventoryLayer.visible = mpaInventoryLayerToggle.checked;
        legendExpand.expanded = true;
      });

      // Toggle function of principal ports layer
      const principalPortsLayerToggle = document.getElementById(
        "principalPortsLayer"
      );
      principalPortsLayerToggle.addEventListener("change", function () {
        principalPortsLayer.visible = principalPortsLayerToggle.checked;
        legendExpand.expanded = true;
      });

      // Toggle function of federal and state waters layer
      const federalAndStateWatersLayerToggle = document.getElementById(
        "federalAndStateWatersLayer"
      );
      federalAndStateWatersLayerToggle.addEventListener("change", function () {
        federalAndStateWatersLayer.visible =
          federalAndStateWatersLayerToggle.checked;
        legendExpand.expanded = true;
      });
    }

    function initiateMapViewer() {
      webmap = new WebMap({
        portalItem: {
          id: "5a210e718b6246d59a53b46db6cb1853",
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
    addLegendAndBookmarkWidgets();
    addSearchWidget();
    addSFILegend();
    addMouseCoordinatesWidget();
    addSummaryReportWidget();
    addGeometryQueryWidget();
    addDistanceMeasurementWidget();


    function addLegendAndBookmarkWidgets() {
      // Widget #1: Legend
      legendExpand = new Expand({
        content: new Legend({
          view: view,
          layerInfos: [
            {
              layer: kelpProductivityLayer,
              title: "Kelp Potential",
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
              title: "Ports and Harbors",
            },
            {
              layer: federalAndStateWatersLayer,
              title: "Federal and State Waters",
            },
          ],
        }),
        view: view,
        expanded: false,
        group: "top-left",
      });

      // Widget #2: Bookmarks
      bookmarkExpand = new Expand({
        content: new Bookmarks({
          view: view,
          // allows bookmarks to be added, edited, or deleted
          editingEnabled: true,
        }),
        view: view,
        expanded: false,
        group: "top-left",
      });

      // Handle Legend Widget
      legendHandle = watchUtils.pausable(
        legendExpand,
        "expanded",
        function (newValue) {
          if (newValue === true) {
            legendHandle.pause();
            setTimeout(function () {
              bookmarkHandle.resume();
            }, 100);
          } else {
            legendHandle.resume();
          }
          if (bookmarkExpand.expanded) {
            bookmarkExpand.collapse();
          }
        }
      );

      // Handle Bookmarks Widget
      bookmarkHandle = watchUtils.pausable(
        bookmarkExpand,
        "expanded",
        function (newValue) {
          if (newValue === true) {
            bookmarkHandle.pause();
            setTimeout(function () {
              legendHandle.resume();
            }, 100);
          } else {
            bookmarkHandle.resume();
          }
          if (legendExpand.expanded) {
            legendExpand.collapse();
          }
        }
      );

      view.ui.add([bookmarkExpand, legendExpand], "top-left");
    }

    function addSearchWidget() {
      // Widget #2: Search
      const searchWidget = new Search({ view });
      view.ui.add(searchWidget, "top-right");
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

    function addSummaryReportWidget() {
      view.ui.add([resultDiv], "top-right");
    }

    function addGeometryQueryWidget() {
      // widget #5: Geometry Query
      window.view = view;
      view.ui.add([queryDiv], "top-right");
    }

    function addSFILegend() {
      // widget #5: Geometry Query
      window.view = view;
      view.ui.add([sfiLegend], "bottom-right");
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

  function addSFIFeatures() {
    addCalculateSFIFeature();
    addReportSFIFeature();

    var isSFICalculationPerformed = false;
    var lastValidMinOCDepth = 20;
    var lastValidMaxOCDepth = 500;
    var lastValidMaxOcToPort = 50;
    var lastValidBiomassRatio = 0.5;
    var lastValidOperationalConstraint = 0.5;
    var minOCDepth = 20;
    var maxOCDepth = 500;
    var maxOcToPort = 50;
    var biomassRatio = 0.5;
    var operationalConstraint = 0.5;

    // data points array for generating the SFI result feature layer
    var sfiResultGraphicsArray = [];

    /********************************************************************************
     *                                  Calculate SFI
     * ******************************************************************************/
    function addCalculateSFIFeature() {
      var isStateWaterExcluded = false;
      var isFederalWaterExcluded = false;
      var isRestrictedAreaExcluded = true;
      var isShippingLanesExcluded = true;
      var isMPAExcluded = true;

      setupSliders();
      setupToggles();
      setupCalculateSFIButton();

      function setupSliders() {
        const minOCDepthSlider = new Slider({
          container: "minOCDepthSlider",
          min: 10,
          max: 100,
          steps: 10,
          values: [20],
          visibleElements: {
            labels: true,
            rangeLabels: true,
          },
        });

        const maxOCDepthSlider = new Slider({
          container: "maxOCDepthSlider",
          min: 100,
          max: 4000,
          steps: 10,
          values: [500],
          visibleElements: {
            labels: true,
            rangeLabels: true,
          },
        });

        const maxOCToPortSlider = new Slider({
          container: "maxOCToPortSlider",
          min: 1,
          max: 250,
          steps: 1,
          values: [50],
          visibleElements: {
            labels: true,
            rangeLabels: true,
          },
        });

        const weightingFactorSlider = new Slider({
          container: "weightingFactor",
          min: 0,
          max: 1,
          steps: 0.1,
          values: [0.5],
          visibleElements: {
            labels: true,
            rangeLabels: false,
          },
          labelFormatFunction: (value, type) => {
            return type === "value"
              ? Math.round(value * 100) + " : " + Math.round(100 - value * 100)
              : null;
          },
        });

        minOCDepthSlider.on("thumb-drag", function (event) {
          minOCDepth = event.value;
        });

        maxOCDepthSlider.on("thumb-drag", function (event) {
          maxOCDepth = event.value;
        });

        maxOCToPortSlider.on("thumb-drag", function (event) {
          maxOcToPort = event.value;
        });

        weightingFactorSlider.on("thumb-drag", function (event) {
          biomassRatio = event.value;
          operationalConstraint = 1 - biomassRatio;
          weightingFactorSlider.labelFormatFunction = function (value, type) {
            if (type === "value") {
              return value < 0.5
                ? Math.round(100 - value * 100) +
                    " : " +
                    Math.round(value * 100)
                : Math.round(100 - value * 100) +
                    " : " +
                    Math.round(value * 100);
            }
          };
        });
      }

      function setupToggles() {
        const excludeFederalToggle = document.getElementById("excludeFederal");
        const excludeStateToggle = document.getElementById("excludeState");
        const excludeShippingLanesToggle = document.getElementById(
          "excludeShippingLanes"
        );
        const excludeRestrictedAreaToggle = document.getElementById(
          "excludeRestrictedArea"
        );

        const excludeMPAToggle = document.getElementById("excludeMPA");

        excludeFederalToggle.addEventListener("change", function () {
          isFederalWaterExcluded = excludeFederalToggle.checked;
        });
        excludeStateToggle.addEventListener("change", function () {
          isStateWaterExcluded = excludeStateToggle.checked;
        });
        excludeShippingLanesToggle.addEventListener("change", function () {
          isShippingLanesExcluded = excludeShippingLanesToggle.checked;
        });
        excludeRestrictedAreaToggle.addEventListener("change", function () {
          isRestrictedAreaExcluded = excludeRestrictedAreaToggle.checked;
        });
        excludeMPAToggle.addEventListener("change", function () {
          isMPAExcluded = excludeMPAToggle.checked;
        });
      }

      function setupCalculateSFIButton() {
        const querySFI = document.getElementById("query-sfi");
        const sfiLegend = document.getElementById("sfiLegend");

        querySFI.addEventListener("click", function () {
          isSFICalculationPerformed = true;
          lastValidMinOCDepth = minOCDepth;
          lastValidMaxOCDepth = maxOCDepth;
          lastValidMaxOcToPort = maxOcToPort;
          lastValidBiomassRatio = biomassRatio;
          lastValidOperationalConstraint = operationalConstraint;
          const indicator = document.getElementById("calculating-indication");

          sfiResultGraphicsArray = [];
          resultsLayer.removeAll();
          indicator.innerText = "Calculating SFI, please wait....";
          sfiLegend.style.display = "block";
          const querySizeLimit = 5000;
          const maxProductivity = 4;

          getStateAndFederalWaterData()
            .then(getRestrictedZonesData)
            .then(getMPAData)
            .then(getShippingLanesData)
            .then(calculateSFI);

          function getStateAndFederalWaterData() {
            const dataLayers = new DataLayers();
            const query = federalAndStateWatersLayer.createQuery();
            return federalAndStateWatersLayer
              .queryFeatures(query)
              .then(function (response) {
                const stateWaterAreas = [];
                const federalWaterAreas = [];
                response.features.map(function (feature) {
                  if (feature.attributes.Jurisdicti == "Federal") {
                    federalWaterAreas.push(feature);
                  } else stateWaterAreas.push(feature);
                });
                dataLayers.setFederalAreas(federalWaterAreas);
                dataLayers.setStateAreas(stateWaterAreas);
                return dataLayers;
              });
          }

          function getRestrictedZonesData(dataLayers) {
            if (!isRestrictedAreaExcluded) return dataLayers;
            const query = dangerZonesAndRestrictedAreasLayer.createQuery();
            return dangerZonesAndRestrictedAreasLayer
              .queryFeatures(query)
              .then(function (response) {
                const restrictedAZones = [];
                response.features.map(function (feature) {
                  restrictedAZones.push(feature);
                });
                dataLayers.setRestrictedZones(restrictedAZones);
                return dataLayers;
              });
          }

          function getMPAData(dataLayers) {
            if (!isMPAExcluded) return dataLayers;
            const query = mpaInventoryLayer.createQuery();
            return mpaInventoryLayer
              .queryFeatures(query)
              .then(function (response) {
                const MPAInventory = [];
                response.features.map(function (feature) {
                  MPAInventory.push(feature);
                });
                dataLayers.setMPAInventory(MPAInventory);
                return dataLayers;
              });
          }

          function getShippingLanesData(dataLayers) {
            if (!isShippingLanesExcluded) return dataLayers;
            const query = shippingLanesLayer.createQuery();
            return shippingLanesLayer
              .queryFeatures(query)
              .then(function (response) {
                const shippingLanes = [];
                response.features.map(function (feature) {
                  shippingLanes.push(feature);
                });
                dataLayers.setShippingLanes(shippingLanes);
                return dataLayers;
              });
          }

          function calculateSFI(dataLayers) {
            for (let i = 1; i < 50000; i += querySizeLimit) {
              queryData(i, querySizeLimit)
                .then(getGraphics)
                .then(waterDepthFilter)
                .then(distanceToPortFilter)
                .then(restrictAreaFilter)
                .then(shippingLanesFilter)
                .then(MPAInventoryFilter)
                .then(waterTypeFilter)
                .then(displayResults);
            }

            indicator.innerText =
              "SFI Calculation done, results are being plotted on the map";

            function queryData(index, querySizeLimit) {
              const query = kelpProductivityLayer.createQuery();
              query.start = index;
              query.num = querySizeLimit;
              return kelpProductivityLayer.queryFeatures(query);
            }

            function getGraphics(results) {
              const graphics = results.features.map(function (graphic) {
                return graphic;
              });
              return graphics;
            }

            function waterDepthFilter(filteringArray) {
              let filteredArray = [];
              filteringArray.forEach(function (graphic) {
                let depth = graphic.attributes.Depth;
                if (depth <= maxOCDepth && depth >= minOCDepth)
                  filteredArray.push(graphic);
                else collectFilteredPoint(graphic);
              });
              return filteredArray;
            }

            function distanceToPortFilter(filteringArray) {
              let filteredArray = [];
              filteringArray.forEach(function (graphic) {
                let distanceToPort = graphic.attributes.Distance_t;
                if (distanceToPort <= maxOcToPort) filteredArray.push(graphic);
                else collectFilteredPoint(graphic);
              });
              return filteredArray;
            }

            function waterTypeFilter(filteringArray) {
              if (!isStateWaterExcluded && !isFederalWaterExcluded) {
                // pass data to the next filter without filtering
                return filteringArray;
              } else {
                // start filtering the data
                let filteredArray = [];
                let stateWaterAreas = dataLayers.getStateAreas();
                let federalWaterAreas = dataLayers.getFederalAreas();

                filteringArray.forEach(function (graphic) {
                  // The mark of whether this data point intersects with the filter
                  let isIntersected = false;
                  if (isStateWaterExcluded) {
                    stateWaterAreas.forEach(function (stateWaterArea) {
                      if (isIntersected) return;
                      else if (
                        geometryEngine.intersects(
                          stateWaterArea.geometry,
                          graphic.geometry
                        )
                      ) {
                        isIntersected = true;
                      }
                    });
                  }
                  if (isFederalWaterExcluded) {
                    federalWaterAreas.forEach(function (federalWaterArea) {
                      if (isIntersected) return;
                      else if (
                        geometryEngine.intersects(
                          federalWaterArea.geometry,
                          graphic.geometry
                        )
                      ) {
                        isIntersected = true;
                      }
                    });
                  }
                  if (!isIntersected) filteredArray.push(graphic);
                  else collectFilteredPoint(graphic);
                });
                return filteredArray;
              }
            }

            function restrictAreaFilter(filteringArray) {
              if (isRestrictedAreaExcluded) {
                // start filtering the data
                let filteredArray = [];
                let restrictedZones = dataLayers.getRestrictedZones();
                filteringArray.forEach(function (graphic) {
                  // The mark of whether this data point intersects with the filter
                  let isIntersected = false;
                  restrictedZones.forEach(function (restrictedZone) {
                    // iterate through each restrict zone
                    // if intersection spotted, set isIntersected mark to be true then break the loop
                    if (isIntersected) return;
                    else if (
                      geometryEngine.intersects(
                        graphic.geometry,
                        restrictedZone.geometry
                      )
                    ) {
                      isIntersected = true;
                    }
                  });
                  if (!isIntersected) filteredArray.push(graphic);
                  else collectFilteredPoint(graphic);
                });
                return filteredArray;
              } else {
                // pass data to the next filter without filtering
                return filteringArray;
              }
            }

            function shippingLanesFilter(filteringArray) {
              if (isShippingLanesExcluded) {
                // start filtering the data
                let filteredArray = [];
                let shippingLanes = dataLayers.getShippingLanes();
                filteringArray.forEach(function (graphic) {
                  // The mark of whether this data point intersects with the filter
                  let isIntersected = false;
                  shippingLanes.forEach(function (shippingLane) {
                    // iterate through each restrict zone
                    // if intersection spotted, set isIntersected mark to be true then break the loop
                    if (isIntersected) return;
                    else if (
                      geometryEngine.intersects(
                        graphic.geometry,
                        shippingLane.geometry
                      )
                    ) {
                      isIntersected = true;
                    }
                  });
                  if (!isIntersected) filteredArray.push(graphic);
                  else collectFilteredPoint(graphic);
                });
                return filteredArray;
              } else {
                // pass data to the next filter without filtering
                return filteringArray;
              }
            }

            function MPAInventoryFilter(filteringArray) {
              if (isMPAExcluded) {
                // start filtering the data
                let filteredArray = [];
                let MPAInventory = dataLayers.getMPAInventory();
                filteringArray.forEach(function (graphic) {
                  // The mark of whether this data point intersects with the filter
                  let isIntersected = false;
                  MPAInventory.forEach(function (MPA) {
                    // iterate through each restrict zone
                    // if intersection spotted, set isIntersected mark to be true then break the loop
                    if (isIntersected) return;
                    else if (
                      geometryEngine.intersects(graphic.geometry, MPA.geometry)
                    ) {
                      isIntersected = true;
                    }
                  });
                  if (!isIntersected) filteredArray.push(graphic);
                  else collectFilteredPoint(graphic);
                });
                return filteredArray;
              } else {
                // pass data to the next filter without filtering
                return filteringArray;
              }
            }

            function displayResults(resultArray) {
              resultArray.forEach(function (graphic) {
                let biomass = graphic.attributes.Maximum_An;
                let bathymetry = graphic.attributes.Depth;
                let distanceToPort = graphic.attributes.Distance_t;
                let sfi = 0;
                let Bn = 0;
                let OC = 0;

                if (
                  bathymetry >= minOCDepth &&
                  bathymetry <= maxOCDepth &&
                  distanceToPort <= maxOcToPort
                ) {
                  Bn = biomass / maxProductivity;
                  let OCz =
                    1 - Math.pow((bathymetry - minOCDepth) / maxOCDepth, 2);
                  let OCp = 1 - distanceToPort / maxOcToPort;
                  OC = (OCz + OCp) / 2;
                  sfi = biomassRatio * Bn + operationalConstraint * OC;
                }

                sfiResultGraphicsArray.push(graphic);

                graphic.attributes = {
                  Biomass: biomass,
                  Bathymetry: bathymetry,
                  SFI: sfi,
                  BiomassRatio: Bn,
                  OperationalConstraint: OC,
                };

                if (sfi === 0) {
                  graphic.symbol = {
                    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    size: 5,
                    color: "#FFFFFF",
                    outline: {
                      width: 0,
                      color: "white",
                    },
                  };
                } else if (sfi < 0.2) {
                  graphic.symbol = {
                    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    size: 5,
                    color: "#E5D1F1",
                    outline: {
                      width: 0,
                      color: "white",
                    },
                  };
                } else if (sfi < 0.4) {
                  graphic.symbol = {
                    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    size: 5,
                    color: "#CBA3E4",
                    outline: {
                      width: 0,
                      color: "white",
                    },
                  };
                } else if (sfi < 0.6) {
                  graphic.symbol = {
                    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    size: 5,
                    color: "#B175D6",
                    outline: {
                      width: 0,
                      color: "white",
                    },
                  };
                } else if (sfi < 0.8) {
                  graphic.symbol = {
                    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    size: 5,
                    color: "#9747C9",
                    outline: {
                      width: 0,
                      color: "white",
                    },
                  };
                } else {
                  graphic.symbol = {
                    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    size: 5,
                    color: "#7E19BC",
                    outline: {
                      width: 0,
                      color: "white",
                    },
                  };
                }
              });
              resultsLayer.addMany(resultArray);
            }

            function collectFilteredPoint(filteredPoint) {
              let biomass = filteredPoint.attributes.Maximum_An;
              let bathymetry = filteredPoint.attributes.Depth;

              filteredPoint.attributes = {
                Biomass: biomass,
                Bathymetry: bathymetry,
                SFI: 0,
                BiomassRatio: 0,
                OperationalConstraint: 0,
              };

              sfiResultGraphicsArray.push(filteredPoint);
            }
          }
        });

        const clearSFI = document.getElementById("clear-report");
        clearSFI.addEventListener("click", function () {
          view.when(function () {
            resultsLayer.removeAll();
            isSFICalculationPerformed = false;
            sfiLegend.style.display = "none";
          });
        });
      }
    }

    /********************************************************************************
     *                         Under construction: Report SFI
     * ******************************************************************************/
    function formatToOneDecimalPlace(value) {
      return Math.round((value + Number.EPSILON) * 10) / 10;
    }

    function formatToTwoDecimalPlaces(value) {
      return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    function addReportSFIFeature() {
      // add a GraphicsLayer for the sketches and the buffer
      const sketchLayer = new GraphicsLayer();
      view.map.addMany([sketchLayer]);

      const printButton = document.getElementById("printBtn");

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
          runQuery();
          view.ui.move(queryDiv, "bottom-right");
          view.ui.move(coordsWidget, "bottom-right");
        }
      });

      sketchViewModel.on("update", function (event) {
        if (event.state === "complete") {
          sketchGeometry = event.graphics[0].geometry;
          runQuery();
          view.ui.move(queryDiv, "bottom-right");
          view.ui.move(coordsWidget, "bottom-right");
        }
      });

      // draw geometry buttons - use a polygon to sktech
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
        view.ui.move(queryDiv, "top-right");
      }

      // print the report when the corresponding button is clicked
      printButton.addEventListener("click", function () {
        var reportWindow = window.open("", "PRINT");

        reportWindow.document.write(
          "<html><head><title>SFI Summary Report</title>"
        );
        reportWindow.document.write(
          '<link rel="stylesheet" type="text/css" href="css/summary_report.css" />'
        );
        reportWindow.document.write("</head><body>");
        reportWindow.document.write(
          document.getElementById("resultDiv").innerHTML
        );
        reportWindow.document.write("</body></html>");
        reportWindow.document.close();
        reportWindow.focus();
        reportWindow.print();
      });

      // set the geometry query
      var debouncedRunQuery = promiseUtils.debounce(function () {
        if (!sketchGeometry) {
          return;
        }

        // make summary result pop up visible
        resultDiv.style.display = "block";
        return promiseUtils.eachAlways([
          querySFIAndCreateHistogram(),
          queryDistanceToPort(),
          queryBathymetry(),
          areaMeasurement(),
          queryJurisdiction(),
        ]);
      });

      function runQuery() {
        debouncedRunQuery().catch((error) => {
          if (error.name === "AbortError") {
            return;
          }

          console.error(error);
        });
      }

      function querySFIAndCreateHistogram() {
        let query = null;
        let avgSFI = null;
        let avgBiomassRatio = null;
        let avgOperationalConstraint = null;

        if (isSFICalculationPerformed) {
          // create the SFI result feature layer
          let sfiResultLayer = new FeatureLayer({
            fields: [
              {
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid",
              },
              {
                name: "Biomass",
                alias: "Biomass",
                type: "double",
              },
              {
                name: "Bathymetry",
                alias: "Bathymetry",
                type: "double",
              },
              {
                name: "SFI",
                alias: "SFI",
                type: "double",
              },
              {
                name: "BiomassRatio",
                alias: "BiomassRatio",
                type: "double",
              },
              {
                name: "OperationalConstraint",
                alias: "OperationalConstraint",
                type: "double",
              },
            ],
            objectIdField: "ObjectID",
            geometryType: "point",
            source: sfiResultGraphicsArray,
          });

          // query for the average SFI of a selected area (feature 2 used)
          avgSFI = {
            onStatisticField: "SFI",
            outStatisticFieldName: "avgSFI",
            statisticType: "avg",
          };

          // query for the average biomass ratio of a selected area (feature 2 used)
          avgBiomassRatio = {
            onStatisticField: "BiomassRatio",
            outStatisticFieldName: "avgBiomassRatio",
            statisticType: "avg",
          };

          // query for the average operational constraint of a selected area (feature 2 used)
          avgOperationalConstraint = {
            onStatisticField: "OperationalConstraint",
            outStatisticFieldName: "avgOperationalConstraint",
            statisticType: "avg",
          };

          query = sfiResultLayer.createQuery();
          query.geometry = sketchGeometry;
          query.outStatistics = [
            avgSFI,
            avgBiomassRatio,
            avgOperationalConstraint,
          ];
          sfiResultLayer.queryFeatures(query).then(displaySFIText);

          createHistogram(sfiResultLayer, "SFI");
        } else {
          // query for the average SFI of a selected area (feature 2 not used)
          avgSFI = {
            onStatisticField: "SFI_defaul",
            outStatisticFieldName: "avgSFI",
            statisticType: "avg",
          };

          // query for the average biomass ratio of a selected area (feature 2 not used)
          avgBiomassRatio = {
            onStatisticField: "SFI_bn",
            outStatisticFieldName: "avgBiomassRatio",
            statisticType: "avg",
          };

          // query for the average operational constraint of a selected area (feature 2 not used)
          avgOperationalConstraint = {
            onStatisticField: "SFI_OC",
            outStatisticFieldName: "avgOperationalConstraint",
            statisticType: "avg",
          };

          query = kelpProductivityLayer.createQuery();
          query.geometry = sketchGeometry;
          query.outStatistics = [
            avgSFI,
            avgBiomassRatio,
            avgOperationalConstraint,
          ];
          kelpProductivityLayer.queryFeatures(query).then(displaySFIText);

          createHistogram(kelpProductivityLayer, "SFI_defaul");
        }

        function displaySFIText(response) {
          var stats = response.features[0].attributes;

          const sfiText = document.getElementById("sfiOutput");
          sfiText.innerHTML = formatToTwoDecimalPlaces(stats.avgSFI);

          const sfiTextFormula = document.getElementById("sfiTextFormula");
          const weightBText = document.getElementById("weightBTextFormula");
          const BText = document.getElementById("BTextFormula");
          const weightOCText = document.getElementById("weightOCTextFormula");
          const OCText = document.getElementById("OCTextFormula");

          sfiTextFormula.innerHTML = formatToTwoDecimalPlaces(stats.avgSFI);
          weightBText.innerHTML = lastValidBiomassRatio;
          BText.innerHTML = formatToTwoDecimalPlaces(stats.avgBiomassRatio);
          weightOCText.innerHTML = lastValidOperationalConstraint;
          OCText.innerHTML = formatToTwoDecimalPlaces(
            stats.avgOperationalConstraint
          );
        }

        function fetchStats(layer, field) {
          const params = {
            layer: layer,
            field: field,
            numBins: 100,
          };

          return promiseUtils.eachAlways([
            histogram(params),
            summaryStatistics(params),
          ]);
        }

        function createHistogram(featureLayer, sfiFieldName) {
          var sfiHistogramArray = [];
          var totalPointsInSelectedArea = 0;
          var farmablePointsInSelectedArea = 0;

          var featureQuery = featureLayer.createQuery();
          featureQuery.geometry = sketchGeometry;
          featureLayer.queryFeatures(featureQuery).then(function (response) {
            totalPointsInSelectedArea = response.features.length;

            sfiHistogramArray = response.features.map(function (graphic) {
              let sfi = null;
              if (sfiFieldName == "SFI") {
                if (graphic.attributes.SFI > 0) {
                  sfi = graphic.attributes.SFI;
                  farmablePointsInSelectedArea =
                    farmablePointsInSelectedArea + 1;
                }
              } else if (sfiFieldName == "SFI_defaul") {
                if (graphic.attributes.SFI_defaul > 0) {
                  sfi = graphic.attributes.SFI_defaul;
                  farmablePointsInSelectedArea =
                    farmablePointsInSelectedArea + 1;
                }
              }
              graphic.attributes = {
                SFI: sfi,
              };
              return graphic;
            });

            // generate a feature layer for histogram-related queries
            let sfiHistogramLayer = new FeatureLayer({
              fields: [
                {
                  name: "ObjectID",
                  alias: "ObjectID",
                  type: "oid",
                },
                {
                  name: "SFI",
                  alias: "SFI",
                  type: "double",
                },
              ],
              objectIdField: "ObjectID",
              geometryType: "point",
              source: sfiHistogramArray,
            });

            fetchStats(sfiHistogramLayer, "SFI")
              .then(function (sfiResponse) {
                const histogramResult = sfiResponse[0].value;
                const statsResult = sfiResponse[1].value;

                const farmableAreaRatioText = document.getElementById(
                  "farmableAreaRatioText"
                );
                const sfiInFarmableArea = document.getElementById(
                  "sfiFarmableOutput"
                );
                farmableAreaRatioText.innerHTML = Math.round(
                  (farmablePointsInSelectedArea / totalPointsInSelectedArea) *
                    100
                );
                sfiInFarmableArea.innerHTML = formatToTwoDecimalPlaces(
                  statsResult.avg
                );

                const minElement = document.getElementById("minSFILabelText");
                const maxElement = document.getElementById("maxSFILabelText");
                minElement.innerText = formatToTwoDecimalPlaces(
                  histogramResult.minValue
                );
                maxElement.innerText = formatToTwoDecimalPlaces(
                  histogramResult.maxValue
                );

                // Creates a Histogram instance from the returned histogram result
                const histogramContainer = document.getElementById("histogram");
                histogramContainer.innerHTML = "";
                const histogramWidget = Histogram.fromHistogramResult(
                  histogramResult
                );
                histogramWidget.container = "histogram";
                histogramWidget.average = statsResult.avg;
                histogramWidget.labelFormatFunction = function (value, type) {
                  return formatToTwoDecimalPlaces(value);
                };
              })
              .catch(function (error) {
                console.error(error);
              });
          });
        }
      }

      function queryDistanceToPort() {
        // query for the minimum distance to port of a selected area
        const distanceToPort = {
          onStatisticField: "Distance_t",
          outStatisticFieldName: "distanceToPort",
          statisticType: "min",
        };

        var outerQuery = kelpProductivityLayer.createQuery();
        outerQuery.geometry = sketchGeometry;
        outerQuery.outStatistics = [distanceToPort];
        kelpProductivityLayer
          .queryFeatures(outerQuery)
          .then(function (response) {
            var stats = response.features[0].attributes;

            var innerQuery = kelpProductivityLayer.createQuery();
            innerQuery.where = "Distance_t = " + stats.distanceToPort;
            innerQuery.outFields = ["Port_ID"];
            kelpProductivityLayer
              .queryFeatures(innerQuery)
              .then(function (result) {
                var portObject = result.features[0].attributes;

                const distanceToPortText = document.getElementById(
                  "portOutput"
                );
                distanceToPortText.innerHTML =
                  formatToOneDecimalPlace(stats.distanceToPort) +
                  "km to<br />" +
                  portObject.Port_ID;

                const maxAllowableDistanceToPort = document.getElementById(
                  "maxAllowableDistanceToPort"
                );
                maxAllowableDistanceToPort.innerHTML =
                  lastValidMaxOcToPort + "km";
              });
          });
      }

      function queryBathymetry() {
        // query for the minimum depth of a selected area
        const minDepth = {
          onStatisticField: "Depth",
          outStatisticFieldName: "minDepth",
          statisticType: "min",
        };

        // query for the average depth of a selected area
        const avgDepth = {
          onStatisticField: "Depth",
          outStatisticFieldName: "avgDepth",
          statisticType: "avg",
        };

        // query for the maximum depth of a selected area
        const maxDepth = {
          onStatisticField: "Depth",
          outStatisticFieldName: "maxDepth",
          statisticType: "max",
        };

        var query = kelpProductivityLayer.createQuery();
        query.geometry = sketchGeometry;
        query.outStatistics = [minDepth, avgDepth, maxDepth];

        kelpProductivityLayer.queryFeatures(query).then(function (response) {
          var stats = response.features[0].attributes;

          const minDepthText = document.getElementById("minDepth");
          const avgDepthText = document.getElementById("avgDepth");
          const maxDepthText = document.getElementById("maxDepth");
          const minDepthAvailable = document.getElementById(
            "minDepthAvailable"
          );
          const maxDepthAvailable = document.getElementById(
            "maxDepthAvailable"
          );

          minDepthText.innerHTML = Math.round(stats.minDepth);
          avgDepthText.innerHTML = Math.round(stats.avgDepth + Number.EPSILON);
          maxDepthText.innerHTML = Math.round(stats.maxDepth);
          minDepthAvailable.innerHTML = lastValidMinOCDepth + "m";
          maxDepthAvailable.innerHTML = lastValidMaxOCDepth + "m";
        });
      }

      function areaMeasurement() {
        // translate the Web Mercator coordinates to Longitude and Latitude values
        var processedRings = [];
        sketchGeometry.rings.forEach(function (ring) {
          var processedRing = [];
          ring.forEach(function (pair) {
            pair = webMercatorUtils.xyToLngLat(pair[0], pair[1]);
            processedRing.push(pair);
          });
          processedRings.push(processedRing);
        });

        const polygonProperties = {
          hasM: false,
          hasZ: false,
          rings: processedRings,
        };
        const sketchPolygon = new Polygon(polygonProperties);

        const areas = geodesicUtils.geodesicAreas(
          [sketchPolygon],
          "square-kilometers"
        );
        const area = Math.abs(Math.round(areas[0]) + Number.EPSILON);
        const areaText = document.getElementById("reportAreaOut");
        areaText.innerHTML = area + " km<sup>2</sup>";
      }

      var jurisdictionChart = null;

      function queryJurisdiction() {
        var federalWaters = [];
        var numOfFederalWatersPoints = 0;
        var numOfPoints = 0;

        // get federal waters data
        var outerQuery = federalAndStateWatersLayer.createQuery();
        federalAndStateWatersLayer
          .queryFeatures(outerQuery)
          .then(function (response) {
            response.features.map(function (feature) {
              if (feature.attributes.Jurisdicti == "Federal") {
                federalWaters.push(feature);
              }
            });

            var innerQuery = kelpProductivityLayer.createQuery();
            innerQuery.geometry = sketchGeometry;
            kelpProductivityLayer
              .queryFeatures(innerQuery)
              .then(function (response) {
                response.features.map(function (graphic) {
                  numOfPoints = response.features.length;
                  // The mark of whether this data point intersects with the filter
                  let isIntersected = false;
                  federalWaters.forEach(function (federalWater) {
                    // iterate through each restrict zone
                    // if intersection spotted, set isIntersected mark to be true then break the loop
                    if (isIntersected) return;
                    else if (
                      geometryEngine.intersects(
                        graphic.geometry,
                        federalWater.geometry
                      )
                    ) {
                      isIntersected = true;
                    }
                  });
                  if (isIntersected)
                    numOfFederalWatersPoints = numOfFederalWatersPoints + 1;
                });

                updateChart(jurisdictionChart, [
                  numOfFederalWatersPoints,
                  numOfPoints - numOfFederalWatersPoints,
                ]);

                const jurisdictionDist = document.getElementById("pieDist");
                jurisdictionDist.innerHTML =
                  Math.round(
                    (numOfFederalWatersPoints / numOfPoints) * 100
                  ) +
                  "% are in Federal Waters and " +
                  Math.round(
                    ((numOfPoints - numOfFederalWatersPoints) / numOfPoints) *
                      100
                  ) +
                  "% are in State Waters";
              });
          });
      }

      // Updates the given chart with new data
      function updateChart(chart, dataValues) {
        chart.data.datasets[0].data = dataValues;
        chart.update();
      }

      function createJurisdictionPieChart() {
        const jurisdictionCanvas = document.getElementById(
          "jurisdictionPieChart"
        );
        jurisdictionChart = new Chart(jurisdictionCanvas.getContext("2d"), {
          type: "doughnut",
          data: {
            labels: ["Federal", "State"],
            datasets: [
              {
                backgroundColor: ["#FD7F6F", "#7EB0D5"],
                borderWidth: 0,
                data: [0, 0],
              },
            ],
          },
          options: {
            responsive: false,
            cutoutPercentage: 0,
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Federal vs State Waters",
            },
          },
        });
      }

      function clearCharts() {
        updateChart(jurisdictionChart, [0, 0]);
      }

      createJurisdictionPieChart();
    }
  }
});
