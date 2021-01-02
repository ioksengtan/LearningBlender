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
	rows.append(reg)	
f.close()
data = {}
data['table'] = rows
f = open('data.json','w')
json.dump(data, f)
f.close()
