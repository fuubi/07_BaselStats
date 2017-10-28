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
  elasticClient.create({
    index: "baselhack",
    type: "dataset",
    body: {
      settings: {
        index : {
          number_of_shards: 3,
          number_of_replicas: 2
        }
      },
      mappings: {
        ...DataSchema
      },
    } }, function(err, response){
    if(err){
      console.log("Could not create index of Dataset "+JSON.stringify(err)+JSON.stringify(response));
    }
    /*if(!err){
      elasticClient.indices.putMapping({index: "baselhack", type:"dataset", body: DataSchema}, function(err, body, code){
        if(err){
          console.log("Could not create mapping "+JSON.stringify(err));
        }
      });

    }else{

    }*/
  });
};

// Clean all indices
elasticClient.delete({index: "baselhack", type: "dataset"}).then(() => createIndex()).catch((error)=>{
  console.log("No index found to delete \n"+JSON.stringify(error));
  createIndex();
});


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