import json
import sys
f = open(sys.argv[1],'r')
lines = f.readlines()
rows = []
for line in lines:
	reg = {}
	data = line.split('\n')[0].split('\t')
	if len(data) != 1:
		continue
	reg['object'] = data[0]
	rows.append(reg)	
f.close()
data = {}
data['table'] = rows
print('total ' + str(len(rows)) + ' rows imported') 
f = open('objects.json.raw','w')
json.dump(data, f)
f.close()
