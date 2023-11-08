import {M3uAttributes, M3uMedia, M3uParser, M3uPlaylist} from "../src";
import {
    complex,
    extGroupDirectiveOrder,
    emptyAttributes,
    invalidAttributes,
    invalidPlaylist,
    urlTvgTags,
    playlistWithExtAttrFromUrl,
    playlistWithExtraHTTPHeaders,
    playlistWithKodiProps
} from "./test-m3u";

describe('Parse and generate test', () => {
    it('should be same as original after parse and generate', () => {
        expect(M3uParser.parse(complex).getM3uString()).toEqual(complex);
        expect(M3uParser.parse(emptyAttributes).getM3uString()).toEqual(emptyAttributes);
    });

    it('should be parsed when random order of #EXTGRP directive is present', () => {
        const parsed = M3uParser.parse(extGroupDirectiveOrder);
        expect(parsed.medias[0].group).toEqual('Test TV group 1');
        expect(parsed.medias[1].group).toEqual('Test TV group 2');
    });

    it('should raise exception when first line is missing', () => {
        const stringWithoutFirstLine = extGroupDirectiveOrder.split('\n').slice(1).join('\n');
        expect(() => M3uParser.parse(stringWithoutFirstLine)).toThrow(new Error('Missing #EXTM3U directive!'));
    });

    it('should generate without playlist title', () => {
        const playlist = new M3uPlaylist();
        playlist.medias.push(new M3uMedia('location'));
        expect(playlist.getM3uString()).toEqual('#EXTM3U\nlocation');
    });

    it('should be parsed when no attributes are present', () => {
        const parsed = M3uParser.parse(emptyAttributes);
        expect(Object.keys(parsed.medias[0].attributes)).toEqual([]);
        expect(Object.keys(parsed.medias[1].attributes)).not.toEqual([]);
    });

    it('should raise exception when parsing invalid m3u string', () => {
        expect(() => M3uParser.parse('')).toThrow(new Error(`m3uString can't be null!`));
    });

    it('should NOT raise exception when parsing invalid m3u string with ignoreErrors argument', () => {
        expect(() => M3uParser.parse('', true)).not.toThrow(new Error(`m3uString can't be null!`));
    });

    it('should raise exception when parsing invalid attribute string', () => {
        expect(() => M3uParser.parse(invalidAttributes)).toThrow(new Error(`Attribute value can't be null!`));
    });

    it('should parse with invalid attributes', () => {
        const attr = new M3uAttributes();
        attr["tvg-id"] = 'Test tv 1';
        const media1 = new M3uMedia('playlist.m3u');
        media1.name = 'Test tv 1 [CZ]';
        media1.group = 'Test TV group 1';
        media1.attributes = attr;

        const media2 = new M3uMedia('playlist.m3u');
        media2.name = '100 group-title="Test2"Test tv 2 [SK]';
        media2.group = '';
        media2.duration = 0;

        const expectedPlaylist = new M3uPlaylist();
        expectedPlaylist.medias = [media1, media2]

        expect(M3uParser.parse(invalidPlaylist, true)).toEqual(expectedPlaylist);
    });

    it('should parse url-tvg attribute', () => {
        const playlist = M3uParser.parse(urlTvgTags);
        expect(playlist.urlTvg).toEqual('http://example.com/tvg.xml');
    });

    it('should write url-tvg attribute', () => {
        const playlist = new M3uPlaylist();
        playlist.urlTvg = 'http://example.com/tvg.xml';
        expect(playlist.getM3uString()).toEqual(urlTvgTags);
    });

    it('should parse extra attributes from url', () => {
        const playlist = M3uParser.parse(playlistWithExtAttrFromUrl);
        expect(playlist.medias[0].extraAttributesFromUrl).toEqual('https://example.com/attributes.txt');
    });

    it('should write extra attributes from url', () => {
        const media = new M3uMedia('http://iptv.test1.com/playlist.m3u8');
        media.name = 'Test tv 1 [CZ]';
        media.group = 'Test TV group 1';
        media.attributes["tvg-id"] = 'Test tv 1';
        media.attributes["tvg-country"] = 'CZ';
        media.attributes["tvg-language"] = 'CS';
        media.attributes["tvg-logo"] = 'logo1.png';
        media.attributes["group-title"] = 'Test1';
        media.attributes["unknown"] = '0';
        media.extraAttributesFromUrl = 'https://example.com/attributes.txt';
        const playlist = new M3uPlaylist();
        playlist.medias.push(media);
        expect(playlist.getM3uString()).toEqual(playlistWithExtAttrFromUrl);
    });

    it('should parse extra http headers', () => {
        const playlist = M3uParser.parse(playlistWithExtraHTTPHeaders);
        expect(playlist.medias[0].extraHttpHeaders).toEqual(JSON.parse('{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0"}'));
    });

    it('should write extra http headers', () => {
        const media = new M3uMedia('http://iptv.test1.com/playlist.m3u8');
        media.name = 'Test tv 1 [CZ]';
        media.name = 'Test tv 1 [CZ]';
        media.group = 'Test TV group 1';
        media.attributes["tvg-id"] = 'Test tv 1';
        media.attributes["tvg-country"] = 'CZ';
        media.attributes["tvg-language"] = 'CS';
        media.attributes["tvg-logo"] = 'logo1.png';
        media.attributes["group-title"] = 'Test1';
        media.attributes["unknown"] = '0';
        media.extraHttpHeaders = JSON.parse('{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0"}');
        const playlist = new M3uPlaylist();
        playlist.medias.push(media);
        expect(playlist.getM3uString()).toEqual(playlistWithExtraHTTPHeaders);
    });

    it('should parse kodi props', () => {
        const playlist = M3uParser.parse(playlistWithKodiProps);
        expect(playlist.medias[0].kodiProps).toEqual(new Map([
            [ 'inputstream.adaptive.manifest_type', 'm3u8' ],
            [ 'inputstream.adaptive.license_type', 'org.w3.clearkey' ],
            [ 'inputstream.adaptive.license_key', 'test' ]
        ]));
    });

    it('should write kodi props', () => {
        const media = new M3uMedia('http://iptv.test1.com/playlist.m3u8');
        media.name = 'Test tv 1 [CZ]';
        media.name = 'Test tv 1 [CZ]';
        media.group = 'Test TV group 1';
        media.attributes["tvg-id"] = 'Test tv 1';
        media.attributes["tvg-country"] = 'CZ';
        media.attributes["tvg-language"] = 'CS';
        media.attributes["tvg-logo"] = 'logo1.png';
        media.attributes["group-title"] = 'Test1';
        media.attributes["unknown"] = '0';
        media.kodiProps = new Map([
            [ 'inputstream.adaptive.manifest_type', 'm3u8' ],
            [ 'inputstream.adaptive.license_type', 'org.w3.clearkey' ],
            [ 'inputstream.adaptive.license_key', 'test' ]
        ]);
        const playlist = new M3uPlaylist();
        playlist.medias.push(media);
        expect(playlist.getM3uString()).toEqual(playlistWithKodiProps);
    });

});
