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
  Bookmarks
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
            label: "Biomass",
          },
        ],
      },
    ],
  };

  // Popup template for federal and state waters layer
  var federalAndStateWatersPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "FederalAndStateWaters: {Jurisdiction}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Jurisdiction",
            label: "Jurisdiction",
          },
          {
            fieldName: "area_mi2",
            label: "Area (square miles)",
          },
          {
            fieldName: "area_km2",
            label: "Area (square kilometers)",
          },
          {
            fieldName: "area_nm2",
            label: "Area (square nautical miles)",
          },
          {
            fieldName: "Shape__Area",
          },
          {
            fieldName: "Shape__Length",
          },
        ],
      },
    ],
  };

  // Popup template for shipping lanes layer
  var shippingLanesPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "ShippingLanes_SCA: {THEMELAYER}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "OBJL",
          },
          {
            fieldName: "THEMELAYER",
          },
          {
            fieldName: "INFORM",
          },
          {
            fieldName: "OBJNAM",
          },
          {
            fieldName: "Shape_Leng",
          },
          {
            fieldName: "Shape_Area",
          },
          {
            fieldName: "Shape__Area",
          },
          {
            fieldName: "Shape__Length",
          },
        ],
      },
    ],
  };

  // Popup template for danger zones and restricted areas layer
  var dangerZonesAndRestrictedAreasPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "DangerZonesAndRestrictedAreas_SCA",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "effectiveD",
          },
          {
            fieldName: "boundaryId",
          },
          {
            fieldName: "boundaryNa",
          },
          {
            fieldName: "boundaryTy",
          },
          {
            fieldName: "boundaryDe",
          },
          {
            fieldName: "instanceCo",
          },
          {
            fieldName: "boundarySo",
          },
          {
            fieldName: "boundary_1",
          },
          {
            fieldName: "agencyOfUs",
          },
          {
            fieldName: "contact",
          },
          {
            fieldName: "nativeDatu",
          },
          {
            fieldName: "state",
          },
          {
            fieldName: "Shape_Leng",
          },
          {
            fieldName: "Shape_Area",
          },
          {
            fieldName: "Shape__Area",
          },
          {
            fieldName: "Shape__Length",
          },
        ],
      },
    ],
  };

  // Popup template for MPA inventory layer
  var mpaInventoryPopupTeamplate = {
    // autocasts as new PopupTemplate()
    title: "MPA Inventory: {Site_ID}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Site_ID",
          },
          {
            fieldName: "Area_KM_To",
          },
          {
            fieldName: "Date_GIS_U",
          },
          {
            fieldName: "Shape_Leng",
          },
          {
            fieldName: "Site_Name",
          },
          {
            fieldName: "Site_Label",
          },
          {
            fieldName: "Gov_Level",
          },
          {
            fieldName: "State",
          },
          {
            fieldName: "NS_Full",
          },
          {
            fieldName: "Prot_Lvl",
          },
          {
            fieldName: "Mgmt_Plan",
          },
          {
            fieldName: "Mgmt_Agen",
          },
          {
            fieldName: "Fish_Rstr",
          },
          {
            fieldName: "Pri_Con_Fo",
          },
          {
            fieldName: "Cons_Focus",
          },
          {
            fieldName: "Prot_Focus",
          },
          {
            fieldName: "Permanence",
          },
          {
            fieldName: "Constancy",
          },
          {
            fieldName: "Estab_Yr",
          },
          {
            fieldName: "URL",
          },
          {
            fieldName: "Vessel",
          },
          {
            fieldName: "Anchor",
          },
          {
            fieldName: "Area_KM_Ma",
          },
          {
            fieldName: "Shape_Le_1",
          },
          {
            fieldName: "Shape_Area",
          },
          {
            fieldName: "Shape__Area",
          },
          {
            fieldName: "Shape__Length",
          },
        ],
      },
    ],
  };

  // Popup template for principal ports layer
  var principalPortsPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "PrincipalPorts_SCA: {portName}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "portNumber",
            label: "Port Number",
          },
          {
            fieldName: "portName",
            label: "Port Name",
          },
          {
            fieldName: "totalCommo",
            label: "Total Common",
          },
          {
            fieldName: "domesticCo",
            label: "Domestic Common",
          },
          {
            fieldName: "foreignCom",
            label: "Foreign Common",
          },
          {
            fieldName: "importComm",
            label: "Import Common",
          },
          {
            fieldName: "exportComm",
            label: "Export Common",
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
            title: "MPA Inventory",
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

  // TODO: ADD 6 Layers
  // 1. Kelp Productivity Map (B)
  // 2. Bathymetry (OC)
  // 3. Distance to Port (OC)
  // 4. Shipping Lanes (MSP)
  // 5. Danger Zones and Restricted Areas (MSP)
  // 6. MPA Inventory (MSP)
});
