/**********************************************************************************
 * This renderer.js file contains custom renderer properties that determine how   *
 * the feature layers are symbolized on the map                                   *    
 **********************************************************************************/

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
      value: "-200",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(116, 252, 223)",
        width: 1,
      },
    },
    {
      value: "-300",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(115, 250, 223)",
        width: 2,
      },
    },
    {
      value: "-400",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(115, 235, 225)",
        width: 1,
      },
    },
    {
      value: "-500",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(115, 214, 230)",
        width: 2,
      },
    },
    {
      value: "-600",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(110, 198, 230)",
        width: 1,
      },
    },
    {
      value: "-700",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(102, 152, 237)",
        width: 2,
      },
    },
    {
      value: "-800",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(95, 130, 237)",
        width: 1,
      },
    },
    {
      value: "-900",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(82, 96, 242)",
        width: 1,
      },
    },
    {
      value: "-1000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(58, 58, 242)",
        width: 1,
      },
    },
    {
      value: "-1100",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(21, 17, 245)",
        width: 1,
      },
    },
    {
      value: "-1200",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(49, 0, 247)",
        width: 3,
      },
    },
    {
      value: "-1300",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(82, 0, 247)",
        width: 1,
      },
    },
    {
      value: "-1400",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(112, 0, 250)",
        width: 1,
      },
    },
    {
      value: "-1500",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(139, 0, 252)",
        width: 1,
      },
    },
    {
      value: "-1600",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(160, 0, 252)",
        width: 1,
      },
    },
   
    {
      value: "-1700",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(187, 0, 255)",
        width: 1,
      },
    },
    {
      value: "-1800",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(187, 0, 255)",
        width: 1,
      },
    },
    {
      value: "-1900",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(187, 0, 255)",
        width: 2,
      },
    },
    {
      value: "-2000",
      description: null,
      symbol: {
        type: "simple-line",
        style: "solid",
        color: "rgb(187, 0, 255)",
        width: 3,
      },
    },
  ],
};

export {
  referenceScale,
  kelpProductivityRenderer,
  principalPortsRenderer,
  bathymetryRenderer,
};
