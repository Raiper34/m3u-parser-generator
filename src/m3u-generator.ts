import {
  M3uDirectives,
  M3uMedia,
  M3uPlaylist,
  M3uAttributes,
  DEFAULT_MEDIA_DURATION
} from "./m3u-playlist";

/**
 * M3u generator class to generate m3u playlist string from playlist object
 */
export class M3uGenerator {

  /**
   * Generate is static method to generate m3u playlist string from playlist object
   * @param playlist - playlist object to generate m3u playlist string
   * @returns final m3u playlist string
   * @example
   * ```ts
   * const playlist = new M3uPlaylist();
   * playlist.title = 'Test playlist';
   * M3uGenerator.generate(playlist);
   * ```
   */
  static generate(playlist: M3uPlaylist): string {
    const pls = playlist.title ? `${M3uDirectives.PLAYLIST}:${playlist.title}` : undefined;
    const medias = playlist.medias.map(item => this.getMedia(item)).join('\n');
    const attributesString = this.getAttributes(playlist.attributes);
    return [M3uDirectives.EXTM3U + attributesString, pls, medias].filter(item => item).join('\n');
  }

  /**
   * Get generated media part string from m3u playlist media object
   * @param media - media object
   * @returns media part string with info, group and location each on separated line
   * @private
   */
  private static getMedia(media: M3uMedia): string {
    const attributesString = this.getAttributes(media.attributes);
    const info = this.shouldAddInfoDirective(media, attributesString) ? `${M3uDirectives.EXTINF}:${media.duration}${attributesString},${media.name}` : null;
    const group = media.group ? `${M3uDirectives.EXTGRP}:${media.group}` : null;
    const bytes = media.bytes ? `${M3uDirectives.EXTBYT}:${media.bytes}` : null;
    const image = media.image ? `${M3uDirectives.EXTIMG}:${media.image}` : null;
    const album = media.album ? `${M3uDirectives.EXTALB}:${media.album}` : null;
    const artist = media.artist ? `${M3uDirectives.EXTART}:${media.artist}` : null;
    const genre = media.genre ? `${M3uDirectives.EXTGENRE}:${media.genre}` : null;
    const extraAttributesFromUrl = media.extraAttributesFromUrl ? `${M3uDirectives.EXTATTRFROMURL}:${media.extraAttributesFromUrl}` : null;
    const extraHttpHeaders = media.extraHttpHeaders ? `${M3uDirectives.EXTHTTP}:${JSON.stringify(media.extraHttpHeaders)}` : null;
    const kodiProps = media.kodiProps ? [...media.kodiProps].map(([key, value]) => `${M3uDirectives.KODIPROP}:${key}=${value}`).join('\n') : null;

    return [
      info,
      group,
      bytes,
      image,
      album,
      artist,
      genre,
      extraAttributesFromUrl,
      extraHttpHeaders,
      kodiProps,
      media.location
    ].filter(item => item).join('\n');
  }

  /**
   * Get generated attributes media part string from m3u attributes object
   * @param attributes - attributes object
   * @returns attributes generated string (attributeName="attributeValue" ...)
   * @private
   */
  private static getAttributes(attributes: M3uAttributes): string {
    const keys = Object.keys(attributes);
    return keys.length ? ' ' + keys.map(key => `${key}="${attributes[key]}"`).join(' ') : '';
  }

  /**
   * Method to determine if we need to add info directive or not based on media object and attributes string.
   * At least media duration, media name or some attributes must be present to return true
   * @param media - m3u media object
   * @param attributesString - m3u attributes string
   * @returns boolean if we should add info directive into final media
   * @private
   */
  private static shouldAddInfoDirective(media: M3uMedia, attributesString: string): boolean {
    return media.duration !== DEFAULT_MEDIA_DURATION || attributesString !== '' || media.name !== undefined;
  }
}
