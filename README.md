# BaselStat - An Open Data Search Engine
 
Nowadays, an enormous amount of data is generated every day. Unfortunately, this data is mostly available on different sources and stored in different file formats.
 
 
We would like to create our own open data search engine with all available statistical data from the Kanton Basel Stadt.
Thus, the exploration of these records should become easy and intuitive, as if one would be googeling any topic.
It also should be possible to discover connection between different domains. The Webapplication should give the user the feeling of a little Data Scientist.
 
 
The public API would allow other developers to create their own applications. Of course our frontend also retrieves its data from the public API.
 
 
Additionally to our Web Application we would like to create a visualisation by using the Microsoft HoloLens.
 
## Technology:
The data is stored in an [Elasticsearch](https://www.elastic.co/) database for easy aggregation, slicing and transformation.

In the backend runs a Python [Flask](http://flask.pocoo.org/) Server.

For the frontend we used [Ionic](https://ionicframework.com/) Webframework. This gives us the possibility to have a webapplication and also a Mobile Application.

For the HoloLens Application we used [Unity](https://unity3d.com/de)

## Build
Clone the project from https://github.com/FUUbi/07_BaselStats.

### Python 3
Create a Python virtual environment.
```
python -m venv venv
pip install -r requirements.txt
```

### Database
For the database run an Elasticsearch database and setup the schema. For that run the script ```setup.bash```in the setup_schema folder.

### Ionic App
Install the dependencies
````
cd frontend
npm install
npm run ionic:serve
```

## Structure
* data Information about the structure 
* database Files for get the Data from Basel Stadt, convert it to json file and import to Elasticsearch
* docker Build all containers
* frontend Coce for the frontend
* scripts Some useful scripts to extract data from svg graphics
* server the backend to run the flask server
* setup_schema Build the schema for the Elasticsearch database

---

Team:
* Denise Bauman
* Fabrizio Parrillo
* Quentin Garnier
* Denis Augsburger
* Nicolas Mauchle
* Gali Shai
