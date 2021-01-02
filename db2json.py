import json
import sys
f = open(sys.argv[1],'r')
lines = f.readlines()
rows = []
for line in lines:
	reg = {}
	data = line.split('\t')
	if len(data) != 6:
		continue
	reg['source'] = data[0]
	reg['link'] = data[1]
	reg['title'] = data[2]
	reg['description'] = data[3]
	reg['thumbnail'] = data[4]
	reg['date'] = data[5]
    reg['tags'] = data[6]
    reg['object'] = data[7]
	rows.append(reg)	
f.close()
data = {}
data['table'] = rows
f = open('data.json.raw','w')
json.dump(data, f)
f.close()
