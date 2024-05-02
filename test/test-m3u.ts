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

export const invalidPlaylist = `
#EXTINF:-1 tvg-id="Test tv 1" unknown= tvg-language=" CS",Test tv 1 [CZ]
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

export const playlistWithExtraHTTPHeaders = `#EXTM3U
#EXTINF:-1 tvg-id="Test tv 1" tvg-country="CZ" tvg-language="CS" tvg-logo="logo1.png" group-title="Test1" unknown="0",Test tv 1 [CZ]
#EXTGRP:Test TV group 1
#EXTHTTP:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0"}
http://iptv.test1.com/playlist.m3u8`

export const playlistWithKodiProps = `#EXTM3U
#EXTINF:-1 tvg-id="Test tv 1" tvg-country="CZ" tvg-language="CS" tvg-logo="logo1.png" group-title="Test1" unknown="0",Test tv 1 [CZ]
#EXTGRP:Test TV group 1
#KODIPROP:inputstream.adaptive.manifest_type=m3u8
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=https://example.com/license.php?id=example
http://iptv.test1.com/playlist.m3u8`

export const playlistWithExtraProps = `#EXTM3U url-tvg="http://example.com/tvg.xml" url-logo="http://path/to/icons/root/"
#EXTINF:-1 tvg-id="Test tv 1" tvg-country="CZ" tvg-language="CS" tvg-logo="logo1.png" group-title="Test1" unknown="0",Test tv 1 [CZ]
#EXTGRP:Test TV group 1
#EXTBYT:123
#EXTIMG:cover.jpg
#EXTALB:test album
#EXTART:test artist
#EXTGENRE:test genre
http://iptv.test1.com/playlist.m3u8`

export const invalidExtM3uAttributes = `#EXTM3U foo="bar`;
