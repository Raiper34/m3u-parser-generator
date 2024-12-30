### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

#### [3.0.0](https://github.com/Raiper34/m3u-parser-generator/compare/2.0.0...3.0.0)

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


