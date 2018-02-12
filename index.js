'use strict'

const Telegram = require('telegram-node-bot'),
	discogsTelegramBot = new Telegram.Telegram('463129846:AAGzPrtx-syuXbe8cc1wVbJLaeWhgocfcjc', {
		workers: 1,
	})

const DiscogsController = require('./controllers/discogs'),
	OtherwhiseController = require('./controllers/otherwise')
const discogsController = new DiscogsController()

discogsTelegramBot.router
	.when(new Telegram.TextCommand('/hello', 'sayHelloCommand'), discogsController)
	.when(new Telegram.TextCommand('/search', 'searchCommand'), discogsController)
	// .when(new Telegram.TextCommand('/username', 'usernameCommand'), discogsController)
	.otherwise(new OtherwhiseController())