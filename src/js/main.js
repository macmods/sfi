// import { kelpProductivityLayerUrl, shippingLanesLayerUrl, dangerZonesAndRestrictedAreasLayerUrl, mpaInventoryLayerUrl } from './config.js';

require([
  // mapping
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  // widgets
  "esri/widgets/Legend",
  "esri/widgets/Search",
  "esri/widgets/Expand",
  "esri/tasks/Locator",
  "esri/widgets/Bookmarks",
  "esri/widgets/Slider",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
], function (
  // mapping
  WebMap,
  MapView,
  FeatureLayer,
  // widgets
  Legend,
  Search,
  Expand,
  Locator,
  Bookmarks,
  Slider,
  DistanceMeasurement2D,
  AreaMeasurement2D
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

  // Popup template for kelp productivity layer
  var kelpProductivityPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "Kelp Productivity",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "biomass",
            label: "Biomass (kilograms-dry)",
          },
        ],
      },
    ],
  };

  // Popup template for federal and state waters layer
  var federalAndStateWatersPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "Federal and State Waters",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Jurisdicti",
            label: "Jurisdiction",
          },
        ],
      },
    ],
  };

  // Popup template for shipping lanes layer
  var shippingLanesPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "Shipping Lanes",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "THEMELAYER",
            label: "Theme Layer",
          },
        ],
      },
    ],
  };

  // Popup template for danger zones and restricted areas layer
  var dangerZonesAndRestrictedAreasPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "Danger Zones and Restricted Areas",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "boundaryNa",
            label: "Boundary Name",
          },
          {
            fieldName: "boundaryTy",
            label: "Boundary Type",
          },
          {
            fieldName: "boundaryDe",
            label: "Boundary Description",
          },
        ],
      },
    ],
  };

  // Popup template for MPA inventory layer
  var mpaInventoryPopupTeamplate = {
    // autocasts as new PopupTemplate()
    title: "Marine Protected Area Inventory",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Site_Name",
            label: "Site Name",
          },
          {
            fieldName: "Gov_Level",
            label: "Level of Government",
          },
        ],
      },
    ],
  };

  // Popup template for principal ports layer
  var principalPortsPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "Principal Ports",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "portName",
            label: "Port Name",
          },
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
    popupTemplate: kelpProductivityPopupTemplate,
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
    popupTemplate: federalAndStateWatersPopupTemplate,
  });

  // Shipping lanes layer
  const shippingLanesLayer = new FeatureLayer({
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/ShippingLanes_SCA/FeatureServer/1",
    visible: false,
    definitionExpression: "(OBJECTID < 3 OR " + "OBJECTID > 4)",
    popupTemplate: shippingLanesPopupTemplate,
  });

  // Danger zones and restricted areas layer
  const dangerZonesAndRestrictedAreasLayer = new FeatureLayer({
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/arcgis/rest/services/DangerZonesAndRestrictedAreas_SCA/FeatureServer/0",
    visible: false,
    popupTemplate: dangerZonesAndRestrictedAreasPopupTemplate,
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
    popupTemplate: mpaInventoryPopupTeamplate,
  });

  // Principal ports layer
  const principalPortsLayer = new FeatureLayer({
    url:
      "https://services7.arcgis.com/4c8njmg1eMIbzYXM/ArcGIS/rest/services/PrincipalPorts_SCA/FeatureServer/0",
    visible: false,
    popupTemplate: principalPortsPopupTemplate,
  });

  // Create a locator task using the world geocoding service
  const locatorTask = new Locator({
    url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
  });

  const webmap = new WebMap({
    portalItem: {
      id: "401c823992004a93aef4401f89b65060",
    },
    layers: [
      kelpProductivityLayer,
      /*bathymetryLayer,*/
      federalAndStateWatersLayer,
      shippingLanesLayer,
      dangerZonesAndRestrictedAreasLayer,
      mpaInventoryLayer,
      principalPortsLayer,
    ],
  });

  const view = new MapView({
    container: "viewDiv",
    map: webmap,
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

  // Toggle function of principal ports layer
  const principalPortsLayerToggle = document.getElementById(
    "principalPortsLayer"
  );
  principalPortsLayerToggle.addEventListener("change", function () {
    principalPortsLayer.visible = principalPortsLayerToggle.checked;
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
            title: "Marine Protected Area Inventory",
          },
          {
            layer: principalPortsLayer,
            title: "Principal Ports",
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

  // widget #5: Distance measurement
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

  // TODO: ADD 6 Layers
  // 1. Kelp Productivity Map (B)
  // 2. Bathymetry (OC)
  // 3. Distance to Port (OC)
  // 4. Shipping Lanes (MSP)
  // 5. Danger Zones and Restricted Areas (MSP)
  // 6. MPA Inventory (MSP)
});
