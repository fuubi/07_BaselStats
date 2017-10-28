
import requests
import json
import logging
import csv
import os
import pdb
from elasticsearch import Elasticsearch


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

CSV_FILE_DIRECTORY = 'csv_files'
JSON_FILE_DIRECTORY = 'json_files'

def get_csv_files():
    logger.info("Start downloading data")
    data_model = json.load(open('../scripts/datamodel.json', 'r'))

    headers = {'authority': 'basleratlas.ch',
               'cookie': '_ga=GA1.2.1267730810.1508505504; _gid=GA1.2.531338445.1509109332',
               'upgrade-insecure-requests': '1',
               'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
               'accept-encodingi': 'gzip, deflate, br',
               'accept-language': 'de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2,it;q=0.2',
               'cache-control': 'max-age=0',
               'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'}
    for key, value in data_model.items():
        if os.path.exists('csv_files/{}.csv'.format(key)):
            logger.info("File already exists")
            continue

        logger.info("Get data for {}".format(key))
        id = value['id']

        if not "wbe" in value['Ebenen']:
            logger.info("Skip {} because wbe does not exists".format(id))
            continue

        layer = value['Ebenen'].split(',')
        url = 'https://basleratlas.ch/geoclip_data_csv.php?iID={}&ngeo={}'.format(id, 'wbe')
        logger.info("URL: {}".format(url))

        # get the data
        r = requests.get(url=url, headers=headers, verify=True)
        print(r.status_code)

        # Write csv files
        with open('{}/{}-{}.csv'.format(CSV_FILE_DIRECTORY, key, layer[0]), 'w') as csv_file:
            csv_file.write(r.text)

def search_area(id, areas):
    for feature in areas['features']:
        prop = feature.get('properties', {})
        if not prop:
            logger.error("Do not find properties in feature")
            return None
        if prop.get('BEZ_ID') == id:
            logger.debug("Found WOV_ID: {}".format(prop.get('WOV_ID', None)))
            return prop.get('WOV_ID', None)


def generate_json_from_csv():
    areas = json.load(open('../data/json/Bezirke.json', 'r'))
    areas_wov_id = {}
    for file in  os.listdir(CSV_FILE_DIRECTORY):
        csvfile = open('{}/{}'.format(CSV_FILE_DIRECTORY, file), 'r')
        logger.info("Read CSV File {}/{}".format(CSV_FILE_DIRECTORY, file))
        jsonfile = open('{}/{}.'.format(JSON_FILE_DIRECTORY, file.replace('csv', 'json')), 'w')

        level = file.split('-')[-1].split('.')[0]
        logger.debug("level: {}".format(level))
        key = ''.join(file.split('-')[0])
        logger.debug("Key: {}".format(key))
        fieldnames = [level, "jahr", key]
        logger.debug("Try to parse file {}".format(file))
        meta_data = json.load(open('../scripts/datamodel.json', 'r'))
        try:
            reader = csv.DictReader(csvfile, fieldnames, delimiter=';')
            idx = -1
            data = []
            for row in reader:
                idx += 1

                # Ignore first entry because it is header
                if idx == 0:
                    continue

                if not row[level] in areas_wov_id.keys():
                    logger.info("Do not find {}".format(row[level]))
                    areas_wov_id[row[level]] = search_area(row[level], areas)
                
                wov_id = areas_wov_id[row[level]]

                data.append({
                    'key': key,
                    level: row[level],
                    'wov_id': wov_id,
                    'year': int(row['jahr']),
                    'count': float(row.get(key, "0")),
                    'indicator': meta_data[key]
                    })
            
            if data:
                with open('{}/{}.'.format(JSON_FILE_DIRECTORY, file.replace('csv', 'json')), 'w') as json_file:
                    json_file.write(json.dumps(data, indent=4))
        except TypeError as e:
            logger.error("Could not parse file {}", file)
            pdb.set_trace()
            continue

def import_to_elastic():
    es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
    idx = 0
    for file in  os.listdir(JSON_FILE_DIRECTORY):
        json_data = json.load(open('{}/{}'.format(JSON_FILE_DIRECTORY, file), 'r'))
        logger.info("process {}".format(file))
        for data in json_data:
            es.index(index='baselHack', doc_type='dataset', id=idx, body=data)
            idx += 1
def main():
    #get_csv_files()
    generate_json_from_csv()
    #import_to_elastic()


if __name__ == "__main__":
    main()