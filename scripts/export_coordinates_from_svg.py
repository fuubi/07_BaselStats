from xml.dom import minidom
import json

doc = minidom.parse(open('../data/svg/Bezirke.svg', 'r'))
data = [{'id': path.getAttribute('fme:BEZ_ID'),
         'name':path.getAttribute('fme:BEZ_NAME'),
         'coordinates': path.getAttribute('d')} for path in doc.getElementsByTagName('path')]

with open('../data/svg/Bezirke.json', 'w') as file:
    file.write(json.dumps(data, indent=4))