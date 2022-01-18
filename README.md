# M3U Parser Generator
Library to parse and generate m3u or m3u8 IPTV playlist files. 

# Instalation
`npm install m3u-parser-generator --save`

# Usage
You can parse your loaded m3u string:
```javascript
const playlist = M3uParser.parse(m3uString);
playlist.medias.forEach(media => media.location);
```
Or you can generate new playlist by your own:
```javascript
const playlist = new M3uPlaylist();
playlist.title = 'Test playlist';

const media1 = new M3uMedia('http://my-stream-ulr.com/playlist.m3u8');
media1.attributes = {'tvg-id': 5, 'tvg-language': 'EN', 'unknown': 'my custom attribute'};
media1.duration = 500;
media1.name = 'Test Channel';
media1.group = 'Test Group';

playlist.medias.push(media1);
const m3uString = playlist.getM3uString();
```
