var unirest = require('unirest');


var SteamInventories = {

	get: function(options, callback) {

		if(!options.appID) {
			throw new TypeError('appID is not set');
		}

		if(!options.contextID) {
			options.contextID = 2;
		}

		var url;
		if(options.steamID) {
			url = `http://steamcommunity.com/profiles/${options.steamID}/inventory/json/${options.appID}/${options.contextID}`;
		}
		else if(options.steamUser) {
			url = `http://steamcommunity.com/id/${options.steamUser}/inventory/json/${options.appID}/${options.contextID}`;
		}
		else {
			throw new TypeError('User identifier hasn\'t been set')
		}

		unirest.get(url)
			.headers({'Accept': 'application/json'})
			.end(function(resp) {

				if(resp.code == 429) {
					throw new Error('Too many requests');
					return;
				}

				var desc = JSON.parse(res.body).rgDescriptions;
				var items = JSON.parse(res.body).rgInventory;

				Object.keys(items).forEach(key => {
					let temp = items[key];
					let item = desc[`${temp.classid}_${temp.instanceid}`];

					if (!item) {
						return response.push({error: true});
					}

					let data = {
						id: temp.id,
						amount: temp.amount,
						pos: temp.pos,
						name: item.name,
						appid: item.appid,
						classid: item.classid,
						instanceid: item.instanceid,
						tradable: item.tradable,
						marketable: item.marketable,
						marketTradableRestriction: item.market_tradable_restriction,
						link: item.actions ? item.actions[0].link : null,
						image: `http://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url_large || item.icon_url}`,
						category: null,
						type: null,
						exterior: null,
						quality: null,
						raw: item,
					};

					// To match http://steamcommunity.com/market/ filters names
					item.tags.forEach(tag => {
						if (tag.category === 'Type') {
							data.type = tag.name;
						}
						if (tag.category === 'Weapon') {
							data.weapon = tag.name;
						}
						if (tag.category === 'Quality') {
							data.category = tag.name;
						}
						if (tag.category === 'Exterior') {
							data.exterior = tag.name;
						}
					});

					response.push(data);
				});

			});

	}

}

module.exports = SteamInventories;