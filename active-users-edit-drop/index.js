#!/usr/bin/env node
const async = require('async'),
	nodemw = require('nodemw'),
	bot = new nodemw({
		protocol: 'https',
		server: 'pl.wikipedia.org',
		path: '/w',
		debug: true
	});

// https://pl.wikipedia.org/wiki/Wikipedia:Najaktywniejsi_wikipedy%C5%9Bci/2018-01-01
let users = [
	'EmptyBot',
	'Gbylski',
	'Jacek rybak',
	'MastiBot',
	'Mboro',
	'McBre',
	'PMG',
];

// https://pl.wikipedia.org/w/api.php?action=help&modules=main#main/datatypes
const time = +new Date(),
	now = new Date().toISOString(),
	then = new Date(time - 90 * 86400*1000).toISOString(); // 90 days ago
	beforeThen = new Date(time - 180 * 86400*1000).toISOString(); // 180 days ago

bot.log(`Now is ${now}, three months ago was ${then} and before then was ${beforeThen}.`);

function getAccountInfo(user, callback) {
	// https://pl.wikipedia.org/w/api.php?action=query&list=users&ususers=McBre&usprop=groups%7Ceditcount
	bot.api.call({
		'action': 'query',
		'list': 'users',
		'ususers': user,
		'usprop': 'groups|editcount'
	}, function(err, data) {
		if (err) throw err;
		callback(data.users[0]);
	});
}

function getContributionsCountBetween(user, from, to, callback) {
	// https://pl.wikipedia.org/w/api.php?action=help&modules=query%2Busercontribs
	// https://pl.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=McBre
	bot.api.call({
		'action': 'query',
		'list': 'usercontribs',
		'ucuser': user,
		//'ucnamespace': 0, // NS_MAIN only
		'ucprop': 'title',
		// results are sorted with the latest edits showing first
		'ucstart': to,
		'ucend': from,
		'uclimit': 5000
	}, function(err, data) {
		if (err) {
			callback(err);
			return;
		}

		let edits = (data.usercontribs || []).length;
		// console.log(data);

		bot.log(`Contributions count for ${user} since ${from} to ${to} is ${edits} edit(s)`);
		callback(null, edits);
	});
}

users.forEach(function(user) {
	bot.log(`Fetching contributions stats for ${user} ...`);

	getAccountInfo(user, function(info) {
		bot.log(`Got info for ${user}: ${info.editcount} edits in total`);

		async.parallel([
			function(callback) { getContributionsCountBetween(user, then, now, callback); },
			function(callback) { getContributionsCountBetween(user, beforeThen, then, callback); },
		],
		function(err, results) {
			if (err) throw err;
			// console.log(results);

			const drop = parseInt( (results[1] - results[0]) / results[1] * 100);

			if (drop > 0) {
				bot.log(`Contributions change for ${user}: ${results[1]} => ${results[0]} / drop of ${drop}%`);
			}
		});
	});
});
