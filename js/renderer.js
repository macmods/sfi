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

const principalPortsRenderer = {
  type: "simple",
  label: "Port or Harbor Location",
  symbol: {
    type: "simple-marker",
    size: 12,
    color: "orange",
    outline: {
      width: 0.5,
      color: "white",
    },
  },
};

const bathymetryRenderer = {
  type: "unique-value",
  field: "depth_m",
  uniqueValueInfos: [
    {
      value: "-10000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(187, 0, 255)",
        width: 3,
      }
    },
    {
      value: "-9000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(160, 0, 252)",
        width: 1,
      }
    },
    {
      value: "-8000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(139, 0, 252)",
        width: 1,
      }
    },
    {
      value: "-7000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(112, 0, 250)",
        width: 1,
      }
    },
    {
      value: "-6000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(82, 0, 247)",
        width: 1,
      }
    },
    {
      value: "-5000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(49, 0, 247)",
        width: 3,
      }
    },
    {
      value: "-4000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(21, 17, 245)",
        width: 1,
      }
    },
    {
      value: "-3000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(58, 58, 242)",
        width: 1,
      }
    },
    {
      value: "-2000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(82, 96, 242)",
        width: 1,
      }
    },
    {
      value: "-1000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(95, 130, 237)",
        width: 1,
      }
    },
    {
      value: "-500",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(102, 152, 237)",
        width: 2,
      }
    },
    {
      value: "-200",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(110, 198, 230)",
        width: 1,
      }
    },
    {
      value: "-100",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(115, 214, 230)",
        width: 2,
      }
    },
    {
      value: "-50",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(115, 235, 225)",
        width: 1,
      }
    },
    {
      value: "-20",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(115, 250, 223)",
        width: 2,
      }
    },
    {
      value: "-10",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(116, 252, 223)",
        width: 1,
      }
    },
  ],
}

const bathymetryRenderer1 = {
  type: "unique-value",
  field: "RuleID",
  field2: null,
  field3: null,
  fieldDelimiter: ",",
  uniqueValueInfos: [
    {
      value: "6",
      label: -10000,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(187, 0, 255)",
        width: 3,
      }
    },
    {
      value: "16",
      label: -9000,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(160, 0, 252)",
        width: 1,
      }
    },
    {
      value: "26",
      label: -8000,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(139, 0, 252)",
        width: 1,
      }
    },
    {
      value: "36",
      label: -7000,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(112, 0, 250)",
        width: 1,
      }
    },
    {
      value: "46",
      label: -6000,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(82, 0, 247)",
        width: 1,
      }
    },
    {
      value: "56",
      label: -5000,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(49, 0, 247)",
        width: 3,
      }
    },
    {
      value: "66",
      label: -4000,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(21, 17, 245)",
        width: 1,
      }
    },
    {
      value: "76",
      label: -3000,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(58, 58, 242)",
        width: 1,
      }
    },
    {
      value: "86",
      label: -2000,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(82, 96, 242)",
        width: 1,
      }
    },
    {
      value: "96",
      label: -1000,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(95, 130, 237)",
        width: 1,
      }
    },
    {
      value: "101",
      label: -500,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(102, 152, 237)",
        width: 2,
      }
    },
    {
      value: "113",
      label: -200,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(110, 198, 230)",
        width: 1,
      }
    },
    {
      value: "117",
      label: -100,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(115, 214, 230)",
        width: 2,
      }
    },
    {
      value: "122",
      label: -50,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(115, 235, 225)",
        width: 1,
      }
    },
    {
      value: "125",
      label: -20,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(115, 250, 223)",
        width: 2,
      }
    },
    {
      value: "126",
      label: -10,
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(116, 252, 223)",
        width: 1,
      }
    },
  ],
}

export { referenceScale, kelpProductivityRenderer, principalPortsRenderer, bathymetryRenderer };
