// Popup template for kelp productivity layer
var kelpProductivityPopupTemplate = {
  // autocasts as new PopupTemplate()
  title: "Kelp Productivity",
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
          fieldName: "depth",
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

// Popup template for federal and state waters layer
var federalAndStateWatersPopupTemplate = {
  // autocasts as new PopupTemplate()
  title: "Federal and State Waters",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "FEDORSTATE",
          label: "Jurisdiction",
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
