/**********************************************************************************
 * This popup_template.js file configures the popup template for each data layer  *
 * that is visualized on the map                                                  *    
 **********************************************************************************/

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

var bathymetryPopupTemplate = {
  title: "Bathymetry",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "depth_m",
          label: "Depth (meters)",
        },
      ],
    },
  ],
};

var shippingLanesPopupTemplate = {
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

var dangerZonesAndRestrictedAreasPopupTemplate = {
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

var mpaInventoryPopupTeamplate = {
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

var principalPortsPopupTemplate = {
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

var federalAndStateWatersPopupTemplate = {
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
