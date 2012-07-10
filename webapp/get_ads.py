#! /usr/bin/env python

import json
from os import walk, path

ads = [];

for (dirpath, dirname, filenames) in walk('ads/'):
    for f in filenames:
        ads.append(  path.join(dirpath, f) )


f = open('ad_list.json', 'w')
f.write('var ads = ' + json.dumps(ads, indent=4))
f.close()
