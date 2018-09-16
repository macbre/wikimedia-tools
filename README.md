# wikimedia-tools
Various bots and tools for Polish Wikipedia


### `active-users-edit-drop`

Takes the list of 500 top Wikipedia editors and compares number of edits in the last three months and three monhts before. Reports accounts if a significant edit drop.

* **TODO**: Group members
* [User info](https://pl.wikipedia.org/w/api.php?action=query&list=users&ususers=McBre&usprop=groups%7Ceditcount)
* [User contributions list](https://pl.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=McBre)
