#!/bin/bash

# Delete index if exist
curl -XDELETE 'localhost:9200/baselhack?pretty'

# Create index
curl -XPUT 'localhost:9200/baselhack?pretty' -H 'Content-Type: application/json' -d'
{
   "settings":{
      "index":{
         "number_of_shards":3,
         "number_of_replicas":2
      }
   },
   "mappings":{
      "dataset":{
         "properties":{
            "key":{
               "type":"string",
               "index":"not_analyzed"
            },
            "year":{
               "type":"integer",
               "index":"not_analyzed"
            },
            "count":{
               "type":"scaled_float",
               "scaling_factor":100
            },
            "wbe":{
               "type":"string",
               "index":"not_analyzed"
            },
            "wov_id":{
               "type":"string",
               "index":"not_analyzed"
            },
            "autoComplete":{
              "type": "completion",
              "analyzer": "standard"
            },
            "indicator":{
               "properties":{
                  "id":{
                     "type":"string",
                     "index":"not_analyzed"
                  },
                  "subject":{
                     "type":"string",
                     "index":"not_analyzed"
                  },
                  "title":{
                     "type":"string",
                     "index":"not_analyzed"
                  },
                  "shortTitle":{
                     "type":"string",
                     "index":"not_analyzed"
                  },
                  "description":{
                     "type":"string"
                  },
                  "layers":{
                     "type":"string"
                  },
                  "source":{
                     "type":"string"
                  },
                  "sourceUrl":{
                     "type":"string",
                     "index":"not_analyzed"
                  },
                  "years":{
                     "type":"string",
                     "index":"not_analyzed"
                  },
                  "linkText":{
                     "type":"string",
                     "index":"not_analyzed"
                  }
               }
            }
         }
      }
   }
}
'
