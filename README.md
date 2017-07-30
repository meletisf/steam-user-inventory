# steam-inventories

Steam Inventories is a forked version of `steam-user-inventory` the uses `unirest` and has a bit better configuration.

**WARNING:** This module uses the steam community inventory method which means that your ip will get an `HTTP 429` after a certain number of calls. Be advised and cache the hell out of it. 


### Install
```
npm install --save steam-inventories
```

### Options

+ __appID__ Is the Steam Application ID. There is no default value and it has to be declared.
+ __contextID__ The default value is 2. Probably you wont have to change it.
+ __steamUser__ Is the username of the user that you want to load the inventory
+ __steamID__ The SteamID 64. It cam be used instead of `steamUser`


### Usage

```js
var SteamInventories = require('steam-inventories');

SteamInventories.get({
	appID: 730,
	steamID: '76561198040824008'
}, function(err, items) {
	if(err) {
		throw err;
	}
	console.log(JSON.stringify(items))
});
```
