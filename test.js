var SteamInventories = require('./index');

SteamInventories.get({
	appID: 730,
	steamID: '76561198040824008'
}, function(items) {
	console.log(JSON.stringify(items))
});