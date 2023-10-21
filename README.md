[![npm version](https://badge.fury.io/js/m3u-parser-generator.svg)](https://badge.fury.io/js/m3u-parser-generator)
[![npm](https://img.shields.io/npm/dt/m3u-parser-generator)](https://badge.fury.io/js/m3u-parser-generator)
[![GitHub Repo stars](https://img.shields.io/github/stars/raiper34/m3u-parser-generator)](https://github.com/Raiper34/m3u-parser-generator)
[![CircleCI](https://circleci.com/gh/Raiper34/m3u-parser-generator.svg?style=shield)](https://circleci.com/gh/Raiper34/m3u-parser-generator)
[![Coverage Status](https://coveralls.io/repos/github/Raiper34/m3u-parser-generator/badge.svg?branch=main)](https://coveralls.io/github/Raiper34/m3u-parser-generator?branch=main)
![npm bundle size](https://img.shields.io/bundlephobia/min/m3u-parser-generator)
![NPM](https://img.shields.io/npm/l/m3u-parser-generator)
[![docs](https://badgen.net/badge/docs/online/orange)](https://m3u-parser-generator.netlify.app)
[![](https://data.jsdelivr.com/v1/package/npm/m3u-parser-generator/badge?style=rounded)](https://www.jsdelivr.com/package/npm/m3u-parser-generator)

# M3U Parser Generator
Library to parse and generate [m3u or m3u8 IPTV playlist files](https://en.wikipedia.org/wiki/M3U). 

# Instalation
`npm install m3u-parser-generator --save`

# Usage
You can parse your loaded m3u string:
```javascript
import {M3uParser} from 'm3u-parser-generator';

const playlist = M3uParser.parse(m3uString);
playlist.medias.forEach(media => media.location);
```
and you get object with following structure
```json
{
  "title": "Test TV",
  "medias": [
    {
      "location": "http://iptv.test1.com/playlist.m3u8",
      "duration": -1,
      "attributes": {
        "tvg-id": "Test tv 1",
        "tvg-country": "CZ",
        "tvg-language": "CS",
        "tvg-logo": "logo1.png",
        "group-title": "Test1",
        "unknown": "0"
      },
      "name": "Test tv 1 [CZ]",
      "group": "Test TV group 1"
    },
    {
      "location": "http://iptv.test2.com/playlist.m3u8",
      "duration": 100,
      "attributes": {
        "tvg-id": "Test tv 2",
        "tvg-country": "SK",
        "tvg-language": "SK",
        "tvg-logo": "logo2.png",
        "group-title": "Test2"
      },
      "name": "Test tv 2 [SK]",
      "group": "Test TV group 2"
    },
    {
      "location": "http://iptv.test3.com/playlist.m3u8",
      "duration": 120,
      "attributes": {
        "tvg-id": "Test tv 3",
        "tvg-country": "EN",
        "tvg-language": "EN",
        "tvg-logo": "logo3.png",
        "group-title": "Test3"
      },
      "name": "Test tv 3 [EN]"
    },
    {
      "location": "http://iptv.test4.com/playlist.m3u8",
      "duration": -1,
      "attributes": {}
    }
  ]
}
```

Or you can generate new playlist by your own:
```javascript
import {M3uPlaylist, M3uMedia} from 'm3u-parser-generator';

const playlist = new M3uPlaylist();
playlist.title = 'Test playlist';

const media1 = new M3uMedia('http://my-stream-ulr.com/playlist.m3u8');
media1.attributes = {'tvg-id': '5', 'tvg-language': 'EN', 'unknown': 'my custom attribute'};
media1.duration = 500;
media1.name = 'Test Channel';
media1.group = 'Test Group';

playlist.medias.push(media1);
const m3uString = playlist.getM3uString();
```
you get
```
#EXTM3U
#PLAYLIST:Test playlist
#EXTINF:500 tvg-id="5" tvg-language="EN" unknown="my custom attribute",Test Channel
#EXTGRP:Test Group
http://my-stream-ulr.com/playlist.m3u8
```

# Usage in browser
You can also use this library in the browser without compiling using jsDelivr.
Import script into HTML file, and you can access classes through the global `m3uParserGenerator` object.
```html
<script src="https://cdn.jsdelivr.net/npm/m3u-parser-generator@1/dist/browser-bundle.min.js"></script>
<script>
    const playlist = new m3uParserGenerator.M3uPlaylist();
    const media1 = new m3uParserGenerator.M3uMedia('http://my-stream-ulr.com/playlist.m3u8');
    playlist.medias.push(media1);
    
    const parsedPlaylist = m3uParserGenerator.M3uParser.parse(m3uString);
</script>
```

# License
MIT
