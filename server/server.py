from flask import Flask, redirect, session, jsonify, request, render_template, url_for, send_from_directory
import sys
import json
from elasticsearch import Elasticsearch

app = Flask(__name__, static_folder='frontend', static_url_path='')
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
data_model = json.load(open('datamodel.json', 'r'))

# test purpose
@app.route('/')
def default():
    return jsonify({'a': 6})

@app.route('/stats')
def stats_overview():
    es_tags = es.search(index="baselhack",
                     doc_type='dataset',
                     size=1000,
                     from_=0,
                     body={"aggs": {"grouped_by_name": {"terms": {"field": "key", "size": 1000}}}})

    app.logger.info('%s', es_tags)
    tags = es_tags.get('aggregations', {}).get('grouped_by_name', {}).get('buckets', [])
    for tag in tags:
        tag['title'] = data_model[tag['key']]['Indikator_Titel']
        tag['description'] = data_model[tag['key']]['Indikator_Beschrieb']
    return jsonify(tags)

@app.route('/stats/<key>')
def stats(key):
    from_ = int(request.args.get("from", 2000))
    to_ = int(request.args.get("to", 2016))
    range = {"range":{
        "year":{
            "gte": from_,
            "lte": to_,
            "format": "yyyy"
        }}}
    stats_es = es.search(index="baselhack",
                         doc_type='dataset',
                         size=1000,
                         from_=0,
                         body={
                           "query":{
                                "bool":{
                                    "must":[
                                        {"match":{"key": key}},
                                        range
                                    ]
                                }
                            },  # Query finished
                         "aggs": { "years": {
                         "terms": {"field": "year", "size": 1000, "order": {"_term": "asc"}},
                           "aggs": { 
                           "sum": {
                             "sum": {"field": "count"}
                           }
                         }
                        }
                        }  
                    })
    stats = stats_es.get('aggregations', {}).get('years', {}).get('buckets', [])
    years = [year['key'] for year in stats]
    sum = [year['sum']['value'] for year in stats]
    return jsonify({'years': years, 'sum': sum})


@app.route('/mapStats/<key>')
def mapStats(key):
    filter = {"match": {"year": int(request.args.get("year", 2015))}}

    stats_es = es.search(index="baselhack",
                         doc_type='dataset',
                         size=1000,
                         from_=0,
                         body={
                           "query":{
                                "bool":{
                                    "must":[
                                        {"match":{"key": key}},
                                        filter
                                    ]
                                }
                            },  # Query finished
                         "aggs": { "wbe": {
                         "terms": {"field": "wbe", "size": 1000, "order": {"_term": "asc"}},
                           "aggs": { 
                           "sum": {
                             "sum": {"field": "count"}
                           }
                         }
                        }
                        }  
                    })
    stats = stats_es.get('aggregations', {}).get('wbe', {}).get('buckets', [])
    #years = [year['key'] for year in stats]
    #sum = [year['sum']['value'] for year in stats]
    #result = {'wbe': years, 'sum': sum}
    return jsonify(stats)

@app.route('/compare/<key>')
def compare(key):
    from_ = int(request.args.get("from", 2000))
    to_ = int(request.args.get("to", 2016))
    elem_2 = request.args.get("with", "alter0")
    range = {"range":{
        "year":{
            "gte": from_,
            "lte": to_,
            "format": "yyyy"
        }}}
    first_element = es.search(index="baselhack",
                         doc_type='dataset',
                         size=1000,
                         from_=0,
                         body={
                           "query":{
                                "bool":{
                                    "must":[
                                        {"match":{"key": key}},
                                        range
                                    ]
                                }
                            },  # Query finished
                         "aggs": { "years": {
                         "terms": {"field": "year", "size": 1000, "order": {"_term": "asc"}},
                           "aggs": { 
                           "sum": {
                             "sum": {"field": "count"}
                           }
                         }
                        }
                        }  
                    })
    second_element = es.search(index="baselhack",
                         doc_type='dataset',
                         size=1000,
                         from_=0,
                         body={
                           "query":{
                                "bool":{
                                    "must":[
                                        {"match":{"key": elem_2}},
                                        range
                                    ]
                                }
                            },  # Query finished
                         "aggs": { "years": {
                         "terms": {"field": "year", "size": 1000, "order": {"_term": "asc"}},
                           "aggs": { 
                           "sum": {
                             "sum": {"field": "count"}
                           }
                         }
                        }
                        }  
                    })
    elem1 = first_element.get('aggregations', {}).get('years', {}).get('buckets', [])
    elem2 = second_element.get('aggregations', {}).get('years', {}).get('buckets', [])
    if not elem1 or not elem2:
        return jsonify({})
    print(elem1)
    print(elem2)
    result = []
    for idx, elem in enumerate(elem1):
        try:
            result.append({key: elem1[idx], elem_2: elem2[idx]})
        except KeyError:
            result.append({})
    return jsonify(result)
def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()
