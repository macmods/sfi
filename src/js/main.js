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
  "esri/geometry/support/geodesicUtils",
  //"esri/units",
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
  "esri/core/watchUtils",
], function (
  // mapping
  WebMap,
  MapView,
  FeatureLayer,
  GraphicsLayer,
  Graphic,
  geometryEngine,
  promiseUtils,
  geodesicUtils,
  //Units,
  // widgets
  Legend,
  Search,
  Expand,
  Locator,
  Bookmarks,
  Slider,
  DistanceMeasurement2D,
  AreaMeasurement2D,
  SketchViewModel,
  watchUtils
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
    addLegendAndBookmarkWidgets();
    addSearchWidget();
    addMouseCoordinatesWidget();
    addGeometryQueryWidget();
    addSummaryReportWidget();
    addDistanceMeasurementWidget();

    function addLegendAndBookmarkWidgets() {
      // Widget #1: Legend
      legendExpand = new Expand({
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
      legendHandle = watchUtils.pausable(legendExpand, "expanded", function (
        newValue
      ) {
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
      });

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

  function addSFIFeatures() {
    addCalculateSFIFeature();
    addReportSFIFeature();

    var isSFICalculationPerformed = false;
    var lastValidMinOCDepth = 20;
    var lastValidMaxOCDepth = 500;
    var lastValidMaxOcToPort = 50;
    var minOCDepth = 20;
    var maxOCDepth = 500;
    var maxOcToPort = 50;

    // data points array for generating the SFI result feature layer
    var sfiResultGraphicsArray = [];

    /********************************************************************************
     *                         Under construction: Calculate SFI
     * ******************************************************************************/
    function addCalculateSFIFeature() {
      var FarmFactor = 0.5;
      var OCFactor = 0.5;
      var isStateWaterExcluded = false;
      var isFederalWaterExcluded = false;
      var isRestrictedAreaExcluded = false;
      var isShippingLanesExcluded = false;
      var isMPAExcluded = false;

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
          FarmFactor = event.value;
          OCFactor = 1 - FarmFactor;
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

        querySFI.addEventListener("click", function () {
          isSFICalculationPerformed = true;
          lastValidMinOCDepth = minOCDepth;
          lastValidMaxOCDepth = maxOCDepth;
          lastValidMaxOcToPort = maxOcToPort;

          sfiResultGraphicsArray = [];
          resultsLayer.removeAll();
          const querySizeLimit = 5000;
          const maxProductivity = 4;

          for (let i = 1; i < 50000; i += querySizeLimit) {
            queryData(i, querySizeLimit)
              .then(getGraphics)
              .then(waterDepthFilter)
              .then(distanceToPortFilter)
              .then(waterTypeFilter)
              .then(restrictAreaFilter)
              .then(shippingLanesFilter)
              .then(MPAInventoryFilter)
              .then(displayResults);
          }

          console.log(resultsLayer);
          console.log(kelpProductivityLayer);

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
            });
            return filteredArray;
          }

          function distanceToPortFilter(filteringArray) {
            let filteredArray = [];
            filteringArray.forEach(function (graphic) {
              let distanceToPort = graphic.attributes.Distance_t;
              if (distanceToPort <= maxOcToPort) filteredArray.push(graphic);
            });
            return filteredArray;
          }

          function waterTypeFilter(filteringArray) {
            if (!isStateWaterExcluded && !isFederalWaterExcluded) {
              // pass data to the next filter without filtering
              return filteringArray;
            } else {
              // start filtering the data
              const query = federalAndStateWatersLayer.createQuery();
              return federalAndStateWatersLayer
                .queryFeatures(query)
                .then(function (response) {
                  let filteredArray = [];
                  let stateWaterAreas = [];
                  let federalWaterAreas = [];
                  response.features.map(function (feature) {
                    if (feature.attributes.Jurisdicti == "Federal") {
                      federalWaterAreas.push(feature);
                    } else stateWaterAreas.push(feature);
                  });
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
                          console.log("intersection spotted by State Water");
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
                          console.log("intersection spotted by Federal Water");
                        }
                      });
                    }
                    if (!isIntersected) filteredArray.push(graphic);
                  });
                  return filteredArray;
                });
            }
          }

          function restrictAreaFilter(filteringArray) {
            if (isRestrictedAreaExcluded) {
              // start filtering the data
              const query = dangerZonesAndRestrictedAreasLayer.createQuery();
              return dangerZonesAndRestrictedAreasLayer
                .queryFeatures(query)
                .then(function (response) {
                  let filteredArray = [];
                  filteringArray.forEach(function (graphic) {
                    // The mark of whether this data point intersects with the filter
                    let isIntersected = false;
                    response.features.map(function (feature) {
                      // iterate through each restrict zone
                      // if intersection spotted, set isIntersected mark to be true then break the loop
                      if (isIntersected) return;
                      else if (
                        geometryEngine.intersects(
                          graphic.geometry,
                          feature.geometry
                        )
                      ) {
                        isIntersected = true;
                        console.log(
                          "intersection spotted by Restricted Area Filter"
                        );
                      }
                    });
                    if (!isIntersected) filteredArray.push(graphic);
                  });
                  return filteredArray;
                });
            } else {
              // pass data to the next filter without filtering
              return filteringArray;
            }
          }

          function shippingLanesFilter(filteringArray) {
            if (isShippingLanesExcluded) {
              // start filtering the data
              const query = shippingLanesLayer.createQuery();
              return shippingLanesLayer
                .queryFeatures(query)
                .then(function (response) {
                  console.log(response);
                  let filteredArray = [];
                  filteringArray.forEach(function (graphic) {
                    // The mark of whether this data point intersects with the filter
                    let isIntersected = false;
                    response.features.map(function (feature) {
                      // iterate through each restrict zone
                      // if intersection spotted, set isIntersected mark to be true then break the loop
                      if (isIntersected) return;
                      else if (
                        geometryEngine.intersects(
                          feature.geometry,
                          graphic.geometry
                        )
                      ) {
                        isIntersected = true;
                        console.log(
                          "intersection spotted by Shipping Lanes Filter"
                        );
                      }
                    });
                    if (!isIntersected) filteredArray.push(graphic);
                  });
                  return filteredArray;
                });
            } else {
              // pass data to the next filter without filtering
              return filteringArray;
            }
          }

          function MPAInventoryFilter(filteringArray) {
            if (isMPAExcluded) {
              // start filtering the data
              const query = mpaInventoryLayer.createQuery();
              return mpaInventoryLayer
                .queryFeatures(query)
                .then(function (response) {
                  let filteredArray = [];
                  console.log(response);
                  filteringArray.forEach(function (graphic) {
                    // The mark of whether this data point intersects with the filter
                    let isIntersected = false;
                    response.features.map(function (feature) {
                      // iterate through each restrict zone
                      // if intersection spotted, set isIntersected mark to be true then break the loop
                      if (isIntersected) return;
                      else if (
                        geometryEngine.intersects(
                          graphic.geometry,
                          feature.geometry
                        )
                      ) {
                        isIntersected = true;
                        console.log("intersection spotted by MPA Filter");
                      }
                    });
                    if (!isIntersected) filteredArray.push(graphic);
                  });
                  return filteredArray;
                });
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

              if (
                bathymetry >= minOCDepth &&
                bathymetry <= maxOCDepth &&
                distanceToPort <= maxOcToPort
              ) {
                let Bn = biomass / maxProductivity;
                let OCz =
                  1 - Math.pow((bathymetry - minOCDepth) / maxOCDepth, 2);
                let OCp = 1 - distanceToPort / maxOcToPort;
                let OC = (OCz + OCp) / 2;
                sfi = FarmFactor * Bn + OCFactor * OC;
              }

              sfiResultGraphicsArray.push(graphic);

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
            });
            resultsLayer.addMany(resultArray);
          }
        });

        const clearSFI = document.getElementById("clear-report");
        clearSFI.addEventListener("click", function () {
          view.when(function () {
            resultsLayer.removeAll();
          });
        });
      }
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
          runQuery();
        }
      });

      sketchViewModel.on("update", function (event) {
        if (event.state === "complete") {
          sketchGeometry = event.graphics[0].geometry;
          runQuery();
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
      }

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
          calculatePolygonArea(),
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

        if (isSFICalculationPerformed) {
          console.log(sfiResultGraphicsArray);
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
            ],
            objectIdField: "ObjectID",
            geometryType: "point",
            source: sfiResultGraphicsArray,
          });

          console.log(sfiResultLayer);

          avgSFI = {
            onStatisticField: "SFI",
            outStatisticFieldName: "avgSFI",
            statisticType: "avg",
          };

          // query for the average SFI of a selected area (feature 2 used)
          query = sfiResultLayer.createQuery();
          query.geometry = sketchGeometry;
          query.outStatistics = [avgSFI];
          sfiResultLayer.queryFeatures(query).then(displaySFIText);

          createHistogram(sfiResultLayer, "SFI");
        } else {
          avgSFI = {
            onStatisticField: "SFI_defaul",
            outStatisticFieldName: "avgSFI",
            statisticType: "avg",
          };

          // query for the average SFI of a selected area (feature 2 not used)
          query = kelpProductivityLayer.createQuery();
          query.geometry = sketchGeometry;
          query.outStatistics = [avgSFI];
          kelpProductivityLayer.queryFeatures(query).then(displaySFIText);

          createHistogram(kelpProductivityLayer, "SFI_defaul");
        }

        function displaySFIText(response) {
          var stats = response.features[0].attributes;

          const sfiText = document.getElementById("sfiOutput");
          sfiText.innerHTML =
            Math.round((stats.avgSFI + Number.EPSILON) * 100000000) / 100000000;
        }

        function createHistogram(featureLayer, sfiFieldName) {
          var sfiHistogramArray = [];

          var featureQuery = featureLayer.createQuery();
          featureQuery.geometry = sketchGeometry;
          featureLayer.queryFeatures(featureQuery).then(function (response) {
            sfiHistogramArray = response.features.map(function (graphic) {
              let sfi = null;
              if ((sfiFieldName = "SFI")) {
                sfi = graphic.attributes.SFI;
              } else if ((sfiFieldName = "SFI_defaul")) {
                sfi = graphic.attributes.SFI_defaul;
              }
              graphic.attributes = {
                SFI: sfi,
              };
              return graphic;
            });

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

            console.log(sfiHistogramLayer);
            // Todo: Histogram Implementation Logic here
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

        var query = kelpProductivityLayer.createQuery();
        query.geometry = sketchGeometry;
        query.outStatistics = [distanceToPort];
        kelpProductivityLayer.queryFeatures(query).then(function (response) {
          var stats = response.features[0].attributes;

          const distanceToPortText = document.getElementById("portOutput");
          distanceToPortText.innerHTML =
            Math.round((stats.distanceToPort + Number.EPSILON) * 100) / 100 +
            "km";

          const maxAllowableDistanceToPort = document.getElementById(
            "maxAllowableDistanceToPort"
          );
          maxAllowableDistanceToPort.innerHTML = lastValidMaxOcToPort + "km";
        });
      }

      function queryBathymetry() {
        // query for the minimum depth of a selected area
        const minDepth = {
          onStatisticField: "Contour",
          outStatisticFieldName: "maxDepth",
          statisticType: "min",
        };

        // query for the average depth of a selected area
        const avgDepth = {
          onStatisticField: "Contour",
          outStatisticFieldName: "avgDepth",
          statisticType: "avg",
        };

        // query for the maximum depth of a selected area
        const maxDepth = {
          onStatisticField: "Contour",
          outStatisticFieldName: "minDepth",
          statisticType: "max",
        };

        var query = bathymetryLayer.createQuery();
        query.geometry = sketchGeometry;
        query.outStatistics = [minDepth, avgDepth, maxDepth];

        bathymetryLayer.queryFeatures(query).then(function (response) {
          var stats = response.features[0].attributes;

          var minDepthText = document.getElementById("minDepth");
          var avgDepthText = document.getElementById("avgDepth");
          var maxDepthText = document.getElementById("maxDepth");
          var minDepthAvailable = document.getElementById("minDepthAvailable");
          var maxDepthAvailable = document.getElementById("maxDepthAvailable");

          minDepthText.innerHTML = -1 * stats.minDepth;
          avgDepthText.innerHTML =
            (-1 * Math.round((stats.avgDepth + Number.EPSILON) * 100)) / 100;
          maxDepthText.innerHTML = -1 * stats.maxDepth;
          minDepthAvailable.innerHTML = lastValidMinOCDepth + "m";
          maxDepthAvailable.innerHTML = lastValidMaxOCDepth + "m";
        });
      }

      function calculatePolygonArea() {
        //const areas = geodesicUtils.geodesicAreas(
        //  [sketchGeometry],
        //  "square-kilometers"
        //);
      }

      var jurisdictionChart = null;

      function queryJurisdiction() {
        const statDefinitions = [
          {
            onStatisticField:
              "CASE WHEN Jurisdiction <> 'Federal' THEN 1 ELSE 0 END",
            outStatisticFieldName: "stateWaters",
            statisticType: "sum",
          },
          {
            onStatisticField:
              "CASE WHEN Jurisdiction = 'Federal' THEN 1 ELSE 0 END",
            outStatisticFieldName: "federalWaters",
            statisticType: "sum",
          },
        ];

        var query = federalAndStateWatersLayer.createQuery();
        query.geometry = sketchGeometry;
        query.outStatistics = statDefinitions;

        federalAndStateWatersLayer
          .queryFeatures(query)
          .then(function (response) {
            const stats = response.features[0].attributes;
            updateChart(jurisdictionChart, [
              stats.federalWaters,
              stats.stateWaters,
            ]);
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
