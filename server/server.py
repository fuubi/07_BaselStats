from flask import Flask, redirect, session, jsonify, request, render_template, url_for, send_from_directory
import sys
from elasticsearch import Elasticsearch

app = Flask(__name__, static_folder='frontend', static_url_path='')
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

# test purpose
@app.route('/')
def default():
    return jsonify({'a': 6})

@app.route('/tags')
def tag():
    return jsonify(es.search(index="baselhack",
                             body={"aggs" : {"tags" : {"terms" : { "field" : "key" }}}},
                             size=1000))

def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()
