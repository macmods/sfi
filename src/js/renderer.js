// Display kelp productivity with simple renderer
const referenceScale = 900000;

const kelpProductivityRenderer = {
  type: "simple",
  symbol: {
    type: "simple-marker",
    size: 5,
    outline: {
      width: 0,
      color: "white",
    },
  },
  visualVariables: [
    {
      type: "color",
      field: "Maximum_An",
      stops: [
        { value: 0, color: "#BFF3C6", opacity: 0.5 },
        { value: 1.0, color: "#73D191", opacity: 0.5 },
        { value: 2.0, color: "#27B05D", opacity: 0.5 },
        { value: 3.0, color: "#1C7F43", opacity: 0.5 },
        { value: 4.2, color: "#124F29", opacity: 0.5 },
      ],
    },
  ],
};

export {
  referenceScale,
  kelpProductivityRenderer,
};
