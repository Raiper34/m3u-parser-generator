import {
  M3uPlaylist,
  M3uMedia,
  M3uAttributes,
  M3uDirectives,
  M3U_COMMENT
} from "./m3u-playlist";

export class M3uParser {

  /**
   *
   * @param attributesString tvg-id="" group-title=""
   * @private
   */
  private static getAttributes(attributesString: string): M3uAttributes {
    const attributeValuePair = attributesString.split('" ');
    const attributes: M3uAttributes = new M3uAttributes();
    attributeValuePair.forEach((item) => {
      const [key, value] = item.split('="');
      attributes[key] = value.replace('"', '');
    });
    return attributes;
  }

  /**
   *
   * @param trackInformation -1 tvg-id="" group-title="",Tv Name
   * @param media
   * @private
   */
  private static processMedia(trackInformation: string, media: M3uMedia): void {
    const lastCommaIndex = trackInformation.lastIndexOf(',');
    const durationAttributes = trackInformation.substring(0, lastCommaIndex);
    media.name = trackInformation.substring(lastCommaIndex + 1);

    const firstSpaceIndex = durationAttributes.indexOf(' ');
    media.duration = Number(durationAttributes.substring(0, firstSpaceIndex));
    const attributes = durationAttributes.substring(firstSpaceIndex + 1);

    media.attributes = this.getAttributes(attributes);
  }

  /**
   *
   * @param item #EXTINF:-1 tvg-id="" group-title="",Tv Name
   * @param playlist
   * @param media
   * @private
   */
  private static processDirective(item: string, playlist: M3uPlaylist, media: M3uMedia): void {
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
      case M3uDirectives.PLAYLIST: {
        playlist.title = trackInformation;
        break;
      }
    }
  }

  private static getPlaylist(lines: string[]): M3uPlaylist {
    const playlist = new M3uPlaylist();
    let media = new M3uMedia('');
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

  private static isDirective(item: string): boolean {
    return item[0] === M3U_COMMENT;
  }

  private static isValidM3u(firstLine: string[]): boolean {
    return firstLine[0].replace('\n', '') === M3uDirectives.EXTM3U;
  }

  static parse(m3uString: string): M3uPlaylist {
    const lines = m3uString.split('\n').filter(item => item);
    if (!this.isValidM3u(lines)) {
      throw new Error(`Missing ${M3uDirectives.EXTM3U} directive!`);
    }
    return this.getPlaylist(lines);
  }
}
