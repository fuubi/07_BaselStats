export const schema = {
  // iID
  id: {
    type: "string",
    index: "not_analyzed"
  },
  // Thema
  subject: {
    type: "string",
    index: "not_analyzed"
  },
  // Indikator_Titel
  title: {
    type: "string",
  },
  // Indikator_Titel_kurz
  shortTitle: {
    type: "string",
    index: "not_analyzed"
  },
  // Indikator_Beschrieb
  description: {
    type: "string",
  },
  // Ebenen
  layers: {
    type: "string"
  },
  // Quelle
  source: {
    type: "string",
  },
  // Link_URL
  sourceUrl: {
    type: "string",
    index: "not_analyzed"
  },

  suggest: {
    type : "completion",
    analyzer : "simple",
    search_analyzer : "simple",
    payloads: true
  }
};

// To use indendent, used from the above export in dataset
export default {
  mappings: {
    indicator: {
      properties: schema
    }
  }
};