import json
import urllib2

file = open('datamodel.json', 'r')
data_model = json.loads(file.read())

for key, value in data_model.iteritems():
    iID = value['iID']
    thema = value['Thema']
    years = value['Jahre'].split('|')
    layer = value['Ebenen'].split(',')

    url = 'https://basleratlas.ch/geoclip_data_csv.php?' \
          'iID=' + iID + '&ngeo=' + layer[0];

    req = urllib2.Request(url)
    req.add_header('authority', 'basleratlas.ch')
    req.add_header('accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
    req.add_header('accept-encodingi', 'gzip, deflate, br')
    req.add_header('accept-language', 'de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2,it;q=0.2')
    req.add_header('cache-control', 'max-age=0')

    req.add_header('cookie','_ga=GA1.2.1267730810.1508505504; _gid=GA1.2.531338445.1509109332')
    req.add_header('upgrade-insecure-requests','1')
    req.add_header('user-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36')

    resp = urllib2.urlopen(req)
    content = resp.read()

    print  content
