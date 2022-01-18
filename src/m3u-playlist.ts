import {M3uGenerator} from "./m3u-generator";

export const M3U_COMMENT = '#'
export const DEFAULT_MEDIA_DURATION = -1;
export enum M3uDirectives {
  EXTM3U = '#EXTM3U',
  EXTINF = '#EXTINF',
  PLAYLIST = '#PLAYLIST',
  EXTGRP = '#EXTGRP',
}

export class M3uPlaylist {
  title: string = '';
  medias: M3uMedia[] = [];

  getM3uString(): string {
    return M3uGenerator.generate(this);
  }
}

export class M3uMedia {

  name?: string;
  group?: string;
  duration: number = DEFAULT_MEDIA_DURATION;
  attributes: M3uAttributes = new M3uAttributes();

  constructor(public location: string) {}
}

export class M3uAttributes {
  'tvg-id'?: string;
  'tvg-language'?: string;
  'tvg-country'?: string;
  'tvg-logo'?: string;
  'group-title'?: string;
  [key: string]: string | undefined;
}
