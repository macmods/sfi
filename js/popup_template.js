// Popup template for kelp productivity layer
var kelpProductivityPopupTemplate = {
  // autocasts as new PopupTemplate()
  title: "Kelp Potential",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "Maximum_An",
          label: "Biomass (kilograms-dry)",
        },
      ],
    },
  ],
};

// Popup template for bathymetry layer
var bathymetryPopupTemplate = {
  //autocasts as new PopupTemplate()
  title: "Bathymetry",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "Contour",
          label: "Depth (meters)",
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
          fieldName: "boundaryName",
          label: "Boundary Name",
        },
        {
          fieldName: "boundaryType",
          label: "Boundary Type",
        },
        {
          fieldName: "boundaryDescription",
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
  title: "Ports and Harbors",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "Name",
          label: "Port Name",
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
          fieldName: "Jurisdiction",
        },
      ],
    },
  ],
};

export {
  kelpProductivityPopupTemplate,
  bathymetryPopupTemplate,
  shippingLanesPopupTemplate,
  dangerZonesAndRestrictedAreasPopupTemplate,
  mpaInventoryPopupTeamplate,
  principalPortsPopupTemplate,
  federalAndStateWatersPopupTemplate,
};
