import {
  M3uPlaylist,
  M3uMedia,
  M3uAttributes,
  M3uDirectives,
  M3U_COMMENT,
} from "./m3u-playlist";

/**
 * Custom data mapping, that defines parsing of unknown directives.
 * Directive can belong to whole playlist, or specific media.
 */
export interface M3uCustomDataMapping {media?: string[], playlist?: string[]}


/**
 * Interface to configure m3u parser
 */
export interface M3uParserConfig {
  /**
   * Ignore errors in file and try to parse it with it
   */
  ignoreErrors?: boolean;
  /**
   * Custom mapping for unknown directives, that can be partially parsed too and added to parsed object
   */
  customDataMapping?: M3uCustomDataMapping,
}

/**
 * M3u parser class to parse m3u playlist string to playlist object
 */
export class M3uParser {

  /**
   * Constructor of class
   * @param config - to configure parser behaviour
   */
  constructor(private readonly config?: M3uParserConfig) { }

  /**
   * Get m3u attributes object from attributes string
   * @param attributesString e.g. 'tvg-id="" group-title=""'
   * @returns attributes object e.g. {"tvg-id": "", "group-title": ""}
   * @private
   */
  private getAttributes(attributesString: string): M3uAttributes {
    const attributes: M3uAttributes = new M3uAttributes();
    if (!attributesString) {
      return attributes;
    }
    const attributeValuePair = attributesString.match(/[^ ]*?=".*?"/g) ?? []; // regex to find `attribute="value"`
    attributeValuePair.forEach((item) => {
      const [key, value] = item.split('="');
      attributes[key] = value.replace('"', '');
    });
    return attributes;
  }

  /**
   * Process media method parse trackInformation and fill media with parsed info
   * @param trackInformation - media substring of m3u string line e.g. '-1 tvg-id="" group-title="",Tv Name'
   * @param media - actual m3u media object
   * @private
   */
  private processMedia(trackInformation: string, media: M3uMedia): void {
    const lastCommaIndex = trackInformation.lastIndexOf(',');
    const durationAttributes = trackInformation.substring(0, lastCommaIndex);
    media.name = trackInformation.substring(lastCommaIndex + 1);

    const firstSpaceIndex = durationAttributes.indexOf(' ');
    const durationEndIndex = firstSpaceIndex > 0 ? firstSpaceIndex : durationAttributes.length;
    media.duration = Number(durationAttributes.substring(0, durationEndIndex));
    const attributes = durationAttributes.substring(durationEndIndex + 1);

    media.attributes = this.getAttributes(attributes);
  }

  /**
   * Process directive method detects directive on line and call proper method to another processing
   * @param item - actual line of m3u playlist string e.g. '#EXTINF:-1 tvg-id="" group-title="",Tv Name'
   * @param playlist - m3u playlist object processed until now
   * @param media - actual m3u media object
   * @private
   */
  private processDirective(item: string, playlist: M3uPlaylist, media: M3uMedia): void {
    const firstSemicolonIndex = item.indexOf(':');
    const directive = item.substring(0, firstSemicolonIndex);
    const trackInformation = item.substring(firstSemicolonIndex + 1);
    switch(directive) {
      case M3uDirectives.EXTINF: {
        this.processMedia(trackInformation, media);
        break;
      }
      case M3uDirectives.EXTGRP: {
        media.group = trackInformation;
        break;
      }
      case M3uDirectives.EXTBYT: {
        media.bytes = Number(trackInformation);
        break;
      }
      case M3uDirectives.EXTIMG: {
        media.image = trackInformation;
        break;
      }
      case M3uDirectives.EXTALB: {
        media.album = trackInformation;
        break;
      }
      case M3uDirectives.EXTART: {
        media.artist = trackInformation;
        break;
      }
      case M3uDirectives.EXTGENRE: {
        media.genre = trackInformation;
        break;
      }
      case M3uDirectives.PLAYLIST: {
        playlist.title = trackInformation;
        break;
      }
      case M3uDirectives.EXTATTRFROMURL: {
        media.extraAttributesFromUrl = trackInformation;
        break;
      }
      case M3uDirectives.EXTHTTP: {
        media.extraHttpHeaders = JSON.parse(trackInformation);
        break;
      }
      case M3uDirectives.KODIPROP: {
        const [key, ...valueParts] = trackInformation.split('=');
        const value = valueParts.join('='); // in case value contains '=', ie. '#KODIPROP:inputstream.adaptive.license_key=https://example.com/license.php?id=example'

        if(!media.kodiProps) {
          media.kodiProps = new Map<string, string>();
        }

        media.kodiProps.set(key, value);
        break;
      }
      default: {
        this.processCustomData(playlist, media, trackInformation, directive);
      }
    }
  }

  /**
   * Process custom unknown directive and add it into playlist or media object, based on mapping configuration
   * @param playlist - m3u playlist object processed until now
   * @param media - actual m3u media object
   * @param trackInformation - track information, whole part of string after directive and semicolon
   * @param directive - unknown directive e.g. #EXT-CUSTOM
   * @private
   */
  private processCustomData(
      playlist: M3uPlaylist,
      media: M3uMedia,
      trackInformation: string,
      directive: string,
  ): void {
    if (this.config?.customDataMapping?.media && this.config.customDataMapping.media.includes(directive)) {
      media.customData.push({directive, value: trackInformation});
    } else if (this.config?.customDataMapping?.playlist && this.config.customDataMapping.playlist.includes(directive)) {
      playlist.customData.push({directive, value: trackInformation});
    }
  }

  /**
   * Process attributes in #EXTM3U line
   * @param item - first line of m3u playlist string e.g. '#EXTM3U url-tvg="http://example.com/tvg.xml"'
   * @param playlist - m3u playlist object processed until now
   * @private
   */
  private processExtM3uAttributes(item: string, playlist: M3uPlaylist): void {
    if(item.startsWith(M3uDirectives.EXTM3U)) {
      const firstSpaceIndex = item.indexOf(' ');
      if(firstSpaceIndex > 0) {
        const attributes = item.substring(firstSpaceIndex + 1);
        playlist.attributes = this.getAttributes(attributes);
      }
    }
  }

  /**
   * Get playlist returns m3u playlist object parsed from m3u string lines
   * @param lines - m3u string lines
   * @returns parsed m3u playlist object
   * @private
   */
  private getPlaylist(lines: string[]): M3uPlaylist {
    const playlist = new M3uPlaylist();
    let media = new M3uMedia('');

    this.processExtM3uAttributes(lines[0], playlist);

    lines.forEach(item => {
      if (this.isDirective(item)) {
        this.processDirective(item, playlist, media);
      } else {
        media.location = item;
        playlist.medias.push(media);
        media = new M3uMedia('');
      }
    });
    return playlist;
  }

  /**
   * Is directive method detect if line contains m3u directive
   * @param item - string line of playlist
   * @returns true if it is line with directive, otherwise false
   * @private
   */
  private isDirective(item: string): boolean {
    return item[0] === M3U_COMMENT;
  }

  /**
   * Is valid m3u method detect if first line of playlist contains #EXTM3U directive
   * @param firstLine - first line of m3u playlist string
   * @returns true if line starts with #EXTM3U, false otherwise
   * @private
   */
  private isValidM3u(firstLine: string[]): boolean {
    return firstLine[0].startsWith(M3uDirectives.EXTM3U);
  }

  /**
   * Parse is method to parse m3u playlist string into m3u playlist object.
   * Playlist need to contain #EXTM3U directive on first line.
   * All lines are trimmed and blank ones are removed.
   * @param m3uString - whole m3u playlist string
   * @param config - additional parsing configuration
   * @returns parsed m3u playlist object
   * @example
   * ```ts
   * const playlist = M3uParser.parse(m3uString);
   * playlist.medias.forEach(media => media.location);
   * ```
   */
  parse(m3uString: string): M3uPlaylist {
    if (!this.config?.ignoreErrors && !m3uString) {
      throw new Error(`m3uString can't be null!`);
    }

    const lines = m3uString.split('\n').map(item => item.trim()).filter(item => item != '');

    if (!this.config?.ignoreErrors && !this.isValidM3u(lines)) {
      throw new Error(`Missing ${M3uDirectives.EXTM3U} directive!`);
    }
    return this.getPlaylist(lines);
  }
}
