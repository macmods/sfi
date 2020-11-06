const referenceScale = 900000;

// Render for kelp productivity layer
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

export { kelpProductivityRenderer };
