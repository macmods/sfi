// Display kelp productivity with simple renderer
const referenceScale = 900000;

const kelpProductivityRenderer = {
  type: "simple", // autocasts as new SimpleRenderer()
  symbol: {
    type: "simple-marker",
    size: 10,
    // color: "black",
    outline: {
      width: 0,
      color: "white",
    },
  },
  visualVariables: [
    {
      type: "color",
      field: "biomass",
      stops: [
        { value: 0.0, color: "#BFF3C6", opacity: 0.7 },
        { value: 1.0, color: "#73D191", opacity: 0.7 },
        { value: 2.0, color: "#27B05D", opacity: 0.7 },
        { value: 3.0, color: "#1C7F43", opacity: 0.7 },
        { value: 4.2, color: "#124F29", opacity: 0.7 },
      ],
    },
  ],
};

// // Display bathymetry with simple renderer
// const bathymetryRenderer = {
//   type: "simple",
//   symbol: {
//     type: "simple-marker",
//     size: 6,
//     color: "black",
//     outline: {
//       width: 0,
//       color: "white",
//     },
//   },
//   visualVariables: [
//     {
//       type: "color",
//       field: "depth",
//       stops: [
//         { value: 0, color: "#F5FFD7", opacity: 0.2 },
//         { value: 1000, color: "#83B5BC", opacity: 0.2 },
//         { value: 2000, color: "#5D9CB3", opacity: 0.2 },
//         { value: 3000, color: "#3783AA", opacity: 0.2 },
//         { value: 4000, color: "#126BA2", opacity: 0.2 },
//       ],
//     },
//   ],
// };

// Display danger zones and restricted areas with simple renderer

// define fill symbols for each class break
const danger = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: "#900C3F",
  style: "backward-diagonal",
  outline: {
    width: 1,
    color: [144, 12, 63, 1],
  },
};

const restricted = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: "#FFC300",
  style: "backward-diagonal",
  outline: {
    width: 1,
    color: [255, 195, 0, 1],
  },
};

const dangerZonesAndRestrictedAreasRenderer = {
  type: "unique-value",
  legendOptions: {
    title: "Boundary Type",
  },
  defaultSymbol: {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "black",
    style: "backward-diagonal",
    outline: {
      width: 0.5,
      color: [50, 50, 50, 0.6],
    },
  },
  defaultLabel: "No Data",
  field: "boundaryTy",
  uniqueValueInfos: [
    {
      value: "Danger Zone",
      symbol: danger,
      label: "Danger Zone",
    },
    {
      value: "Restricted Area",
      symbol: restricted,
      label: "Restricted Area",
    },
  ],
};

export { kelpProductivityRenderer, dangerZonesAndRestrictedAreasRenderer };
