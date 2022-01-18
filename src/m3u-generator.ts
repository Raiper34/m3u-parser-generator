import {
  M3uDirectives,
  M3uMedia,
  M3uPlaylist,
  M3uAttributes,
  DEFAULT_MEDIA_DURATION
} from "./m3u-playlist";

export class M3uGenerator {

  static generate(playlist: M3uPlaylist): string {
    const pls = playlist.title ? `${M3uDirectives.PLAYLIST}:${playlist.title}` : undefined;
    const medias = playlist.medias.map(item => this.getMedia(item)).join('\n');
    return [M3uDirectives.EXTM3U, pls, medias].filter(item => item).join('\n');
  }

  private static getMedia(media: M3uMedia): string {
    const attributesString =  this.getAttributes(media.attributes);
    const info = this.shouldAddInfoDirective(media, attributesString) ? `${M3uDirectives.EXTINF}:${media.duration} ${attributesString},${media.name}` : null;
    const group = media.group ? `${M3uDirectives.EXTGRP}:${media.group}` : null;
    return [info, group, media.location].filter(item => item).join('\n');
  }

  private static getAttributes(attributes: M3uAttributes): string {
    return Object.keys(attributes).map(key => `${key}="${attributes[key]}"`).join(' ');
  }

  private static shouldAddInfoDirective(media: M3uMedia, attributesString: string): boolean {
    return media.duration !== DEFAULT_MEDIA_DURATION || attributesString !== '' || media.name !== undefined;
  }
}
