const schema = {
  year: {
    type: "integer",
    index: "not_analyzed"
  },
  // Precision of 2 numbers after the point, i. e. 12.34 -> 1234 in index
  count: {
    type:"scaled_float",
    scaling_factor: 100,
    index:"not_analyzed"
  },
  layer:{
    type:"string",
    index: "not_analyzed"
  },

  suggest: {
    type : "completion",
    analyzer : "simple",
    search_analyzer : "simple",
    payloads: true
  }
};

export default {
  dataset: {
    properties: schema
  }
};