### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

#### [5.0.0](https://github.com/Raiper34/m3u-parser-generator/compare/4.0.0...5.0.0)

- build(vite): add vite to build everrything with one tool and remove browserify and uglify [`da17e56`](https://github.com/Raiper34/m3u-parser-generator/commit/da17e5619c7940782359f35d0871433198e8f47e)
- docs(readme): automatic version dump [`3398d61`](https://github.com/Raiper34/m3u-parser-generator/commit/3398d61fca8125f2384753f9926a4b64ae659a7a)
- docs(readme): improve style of readme [`d972b7b`](https://github.com/Raiper34/m3u-parser-generator/commit/d972b7b688727cd116a2e06ebe8700e1c9817dd7)
- docs(readme): change style of instruction code of instalation chapter [`789131a`](https://github.com/Raiper34/m3u-parser-generator/commit/789131a47597d95201e598f1507a9d2b99367919)

### [4.0.0](https://github.com/Raiper34/m3u-parser-generator/compare/3.0.0...4.0.0)

> 1 February 2025

- feat(parser): change parser api [`8fac5f1`](https://github.com/Raiper34/m3u-parser-generator/commit/8fac5f16dc64fabe838a4c4b733b05720b922d91)
- fix(kodiprops): remove default kodi props map, should be undefined by default [`b98bba5`](https://github.com/Raiper34/m3u-parser-generator/commit/b98bba5b81c56f7c84010888f373561770ff71a5)

### [3.0.0](https://github.com/Raiper34/m3u-parser-generator/compare/2.0.0...3.0.0)

> 30 December 2024

- build(node): update node to v22, typescript to v5 and all possible dependencies [`b60d4fa`](https://github.com/Raiper34/m3u-parser-generator/commit/b60d4fa4096ceb80d8dd0fb2ea4ebd10aece0859)
- docs(readme): improve readme.md [`8c05961`](https://github.com/Raiper34/m3u-parser-generator/commit/8c05961e5e74648d1fd088bd1910841a22dc0324)
- docs(readme): unify badges [`191ae57`](https://github.com/Raiper34/m3u-parser-generator/commit/191ae571061359ebdb4163f2f365d1877208fd48)

<!-- auto-changelog-above -->

#### 2.0.0 (2024-07-31)
* added ability to configure to parse custom or unknown directives

#### 1.7.2 (2024-05-08)
* fix `KODIPROP` with multiple `=` characters

#### ~~1.7.1 (2024-05-07)~~
* ~~fix `KODIPROP` with multiple `=` characters~~

#### 1.7.0 (2024-02-23)
* added support for `#EXTBYT`/`EXTIMG`/`EXTALB`/`EXTART`/`EXTGENRE` directives and `#EXTM3U` attributes

#### 1.6.0 (2023-12-20)
* change attributes parser to be able to handle strings starting with space (attribute=" value"), also skip invalid attributes by default 

#### 1.5.0 (2023-11-27)
* enhance M3U Playlist with extra attributes (url-tvg attribute, extra attributes from URL, extra HTTP headers, Kodi properties)

#### 1.4.1 (2023-10-21)
* fix ignoreErrors to be able also parse playlists with errors

#### 1.4.0 (2023-07-17)
* ability to ignore file errors during parsing (`ignoreErrors` argument)

#### 1.3.0 (2023-06-18)
* ignore blank lines
* fix empty attributes

#### 1.2.0 (2022-10-01)

* add API documentation
* add delivrJs badge
* build project on node 14

#### 1.1.1 (2022-09-08)

* \#EXTM3U tag do not need to be placed on own line

#### 1.1.0 (2022-09-03)

* browser bundle
* coveralls readme badge

#### 1.0.4 (2022-03-09)

* remove unit tests from npm dist package

#### 1.0.3 (2022-01-24)

* remove unit tests from npm dist package

#### 1.0.2 (2022-01-24)

* add README badges
* improve documentation

#### 1.0.1 (2022-01-24)

* change exports/imports path
* add circle ci to project
* add circle ci badge and others


