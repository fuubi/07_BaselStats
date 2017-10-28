import { Client } from 'elasticsearch';
import logger from './helper/logger';
import DataSchema from './schemas/dataset';
// import IndicatorSchema from './schemas/indicator';

const elasticClient = new Client({
  hosts: [
    'localhost:9200',
  ],
  sniffOnStart: true,
  log: {
    type: 'console',
    level: 'trace'
  }
});

// Create index
const createIndex = () => {
  elasticClient.create({index: "baselhack", type: "dataset", id: "1", body: {} }, function(err, body, code){
    if(!err){
      elasticClient.indices.putMapping({index: "baselhack", type:"dataset", body: DataSchema}, function(err, body, code){
        if(err){
          console.log("Could not create mapping "+JSON.stringify(err));
        }
      });

    }else{
      console.log("Could not create index of Dataset "+JSON.stringify(err)+JSON.stringify(body)+JSON.stringify(code));
    }
  });
};

// Clean all indices
elasticClient.delete({index: "baselhack", type: "dataset", id: "1"}).then();

try {
  elasticClient.delete({index: "baselhack", type: "dataset", id: "1"});
  // elasticClient.delete({index: "baselhack", type: "dataset", id: "2"});
} catch(err){
  console.log("No index found to delete");
}



/** Create the mapping of the indicator */
/*
elasticClient.create({index: "baselhack", type: "indicator", id: "2", body: {} }, function(err, body, code){
  if(!err){
    elasticClient.indices.putMapping({index: "baselhack", type: "indicator", body: IndicatorSchema}, function(err, body, code){
      if(err){
        console.log("Could not create mapping of indicator "+JSON.stringify(err));
      }
    });

  }else{
    console.log("Could not create index of indicator "+JSON.stringify(err));
  }
});
*/