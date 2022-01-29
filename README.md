[![npm version](https://badge.fury.io/js/m3u-parser-generator.svg)](https://badge.fury.io/js/m3u-parser-generator)
[![CircleCI](https://circleci.com/gh/Raiper34/m3u-parser-generator.svg?style=shield)](https://circleci.com/gh/Raiper34/m3u-parser-generator)
![npm bundle size](https://img.shields.io/bundlephobia/min/m3u-parser-generator)
![NPM](https://img.shields.io/npm/l/m3u-parser-generator)
[![stack blitz](https://badgen.net/badge/stackblitz/online/orange)](https://stackblitz.com/edit/typescript-x6lc4j)

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
