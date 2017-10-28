import { schema as indicator } from './indicator';

const schema = {
  year: {
    type: "integer",
    index: "not_analyzed"
  },
  // Precision of 2 numbers after the point, i. e. 12.34 -> 1234 in index
  count: {
    type:"scaled_float",
    scaling_factor: 100,
  },
  // Wohnbezirk
  wbe: {
    type: "string",
    index: "not_analyzed"
  },
  // Wohnviertel
  wvi: {
    type: "string",
    index: "not_analyzed"
  },
  indicator: {
    properties: indicator
  }
};

export default {
    dataset: {
      properties: schema
    }
};