import {M3uGenerator} from "./m3u-generator";

export const M3U_COMMENT = '#'
export const DEFAULT_MEDIA_DURATION = -1;
export enum M3uDirectives {
  EXTM3U = '#EXTM3U',
  EXTINF = '#EXTINF',
  PLAYLIST = '#PLAYLIST',
  EXTGRP = '#EXTGRP',
  EXTATTRFROMURL = '#EXTATTRFROMURL',
  EXTHTTP = '#EXTHTTP',
  KODIPROP = '#KODIPROP'
}

/**
 * M3u playlist object
 */
export class M3uPlaylist {
  /**
   * Title of playlist
   * @example code
   * ```ts
   * const playlist = new M3uPlaylist();
   * playlist.title = 'Test playlist';
   * ```
   * @example example output in final m3u string
   * ```
   * #PLAYLIST:Test TV
   * ```
   */
  title = '';
  urlTvg?: string = undefined;
  /**
   * M3u media objects
   * @example
   * ```ts
   * const playlist = new M3uPlaylist();
   * const media1 = new M3uMedia('http://my-stream-ulr.com/playlist.m3u8');
   * playlist.medias.push(media1);
   * ```
   */
  medias: M3uMedia[] = [];

  /**
   * Get m3u string method to get m3u playlist string of current playlist object
   * @returns m3u playlist string
   */
  getM3uString(): string {
    return M3uGenerator.generate(this);
  }
}

/**
 * M3u media object
 * @example code example
 * ```ts
 * const media1 = new M3uMedia('http://my-stream-ulr.com/playlist.m3u8');
 * ```
 * @example example output in final m3u string
 * ```
 * #EXTINF:-1 tvg-id="Test tv 1" tvg-country="CZ" tvg-language="CS" tvg-logo="logo1.png" group-title="Test1" unknown="0",Test tv 1 [CZ]
 * #EXTGRP:Test TV group 1
 * http://iptv.test1.com/playlist.m3u8
 * ```
 */
export class M3uMedia {

  /**
   * Name of media
   */
  name?: string;
  /**
   * Group of media
   */
  group?: string;
  /**
   * Duration of media. Default value is -1 (infinity).
   */
  duration: number = DEFAULT_MEDIA_DURATION;
  /**
   * Attributes of media. Default value is empty attributes object.
   */
  attributes: M3uAttributes = new M3uAttributes();

  /**
   * Extra attributes from url
   */
  extraAttributesFromUrl?: string = undefined;

  /**
   * Extra HTTP headers
   */
  extraHttpHeaders?: unknown = undefined;

  /**
   * Kodi props
   */
  kodiProps?: Map<string, string> = new Map<string, string>();

  /**
   * Constructor
   * @param location - location of stream
   */
  constructor(public location: string) {}
}

/**
 * M3u media attributes. Can contains know attributes, or unknown custom user defined.
 * @example
 * ```ts
 * const media1 = new M3uMedia('http://my-stream-ulr.com/playlist.m3u8');
 * media1.attributes = {'tvg-id': '5', 'tvg-language': 'EN', 'unknown': 'my custom attribute'};
 * ```
 */
export class M3uAttributes {
  /**
   * tvg-id attribute, widely used
   */
  'tvg-id'?: string;
  /**
   * tvg-language attribute, widely used
   */
  'tvg-language'?: string;
  /**
   * tvg-country attribute, widely used
   */
  'tvg-country'?: string;
  /**
   * tvg-logo attribute, widely used
   */
  'tvg-logo'?: string;
  /**
   * group-title attribute, widely used
   */
  'group-title'?: string;

  /**
   * unknown user defined attribute
   */
  [key: string]: string | undefined;
}
