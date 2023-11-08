export const complex = `#EXTM3U
#PLAYLIST:Test TV
#EXTINF:-1 tvg-id="Test tv 1" tvg-country="CZ" tvg-language="CS" tvg-logo="logo1.png" group-title="Test1" unknown="0",Test tv 1 [CZ]
#EXTGRP:Test TV group 1
http://iptv.test1.com/playlist.m3u8
#EXTINF:100 tvg-id="Test tv 2" tvg-country="SK" tvg-language="SK" tvg-logo="logo2.png" group-title="Test2",Test tv 2 [SK]
#EXTGRP:Test TV group 2
http://iptv.test2.com/playlist.m3u8
#EXTINF:120 tvg-id="Test tv 3" tvg-country="EN" tvg-language="EN" tvg-logo="logo3.png" group-title="Test3",Test tv 3 [EN]
http://iptv.test3.com/playlist.m3u8
http://iptv.test4.com/playlist.m3u8`;

export const extGroupDirectiveOrder = `#EXTM3U
#EXTINF:-1 tvg-id="Test tv 1" tvg-country="CZ" tvg-language="CS" tvg-logo="logo1.png" group-title="Test1" unknown="0",Test tv 1 [CZ]
#EXTGRP:Test TV group 1
http://iptv.test1.com/playlist.m3u8
#EXTGRP:Test TV group 2
#EXTINF:100 tvg-id="Test tv 2" tvg-country="SK" tvg-language="SK" tvg-logo="logo2.png" group-title="Test2",Test tv 2 [SK]
http://iptv.test2.com/playlist.m3u8`;

export const emptyAttributes = `#EXTM3U
#EXTINF:-1,Test tv 1 [CZ]
#EXTGRP:Test TV group 1
http://iptv.test1.com/playlist.m3u8
#EXTINF:100 tvg-id="Test tv 2" tvg-country="SK" tvg-language="SK" tvg-logo="logo2.png" group-title="Test2",Test tv 2 [SK]
#EXTGRP:Test TV group 2
http://iptv.test2.com/playlist.m3u8`;

export const invalidAttributes = `#EXTM3U
#EXTINF:-1 tvg-id="Test tv 1" tvg-country="CZ" tvg-language="CS" tvg-logo="logo1.png" group-title="Test1" unknown=,Test tv 1 [CZ]
#EXTGRP:Test TV group 1
http://iptv.test1.com/playlist.m3u8
#EXTINF:100 unknown=" tvg-id="Test tv 2" tvg-country="SK" tvg-language="SK" tvg-logo="logo2.png" group-title="Test2",Test tv 2 [SK]
#EXTGRP:Test TV group 2
http://iptv.test2.com/playlist.m3u8`;

export const invalidPlaylist = `
#EXTINF:-1 tvg-id="Test tv 1" tvg-country=" tvg-language="CS",Test tv 1 [CZ]
#EXTGRP:Test TV group 1
#INVALID:Something
playlist.m3u
#EXTINF:100 group-title="Test2"Test tv 2 [SK]
#EXTGRP:
playlist.m3u`;

export const urlTvgTags = `#EXTM3U url-tvg="http://example.com/tvg.xml"`;

export const playlistWithExtAttrFromUrl = `#EXTM3U
#EXTINF:-1 tvg-id="Test tv 1" tvg-country="CZ" tvg-language="CS" tvg-logo="logo1.png" group-title="Test1" unknown="0",Test tv 1 [CZ]
#EXTGRP:Test TV group 1
#EXTATTRFROMURL:https://example.com/attributes.txt
http://iptv.test1.com/playlist.m3u8`
