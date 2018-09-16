active-users-edit-drop
======================

```
$ ./index.js 2>&1 | grep PMG

info:    Fetching contributions stats for PMG ...
debug:   GET <https://pl.wikipedia.org/w/api.php?action=query&list=users&ususers=PMG&usprop=groups%7Ceditcount&format=json>
info:    Got info for PMG: 220226 edits in total
debug:   GET <https://pl.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=PMG&ucprop=title&ucstart=2018-09-16T15%3A31%3A39.047Z&ucend=2018-06-18T15%3A31%3A39.047Z&uclimit=5000&format=json>
debug:   GET <https://pl.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=PMG&ucprop=title&ucstart=2018-06-18T15%3A31%3A39.047Z&ucend=2018-03-20T15%3A31%3A39.047Z&uclimit=5000&format=json>
info:    Contributions count for PMG since 2018-03-20T15:31:39.047Z to 2018-06-18T15:31:39.047Z is 80 edit(s)
info:    Contributions count for PMG since 2018-06-18T15:31:39.047Z to 2018-09-16T15:31:39.047Z is 500 edit(s)
```

```
$ ./index.js 2>&1 | grep drop
info:    Contributions change for Mboro: 225 => 222 / drop of 1%
```
