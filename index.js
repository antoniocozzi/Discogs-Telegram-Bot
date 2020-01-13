// 'use strict'

// const Telegram = require('telegram-node-bot'),
// 	discogsTelegramBot = new Telegram.Telegram('463129846:AAGzPrtx-syuXbe8cc1wVbJLaeWhgocfcjc', {
// 		workers: 1,
// 	})

// const DiscogsController = require('./controllers/discogs'),
// 	OtherwhiseController = require('./controllers/otherwise')
// const discogsController = new DiscogsController()

// discogsTelegramBot.router
// 	.when(new Telegram.TextCommand('/hello', 'sayHelloCommand'), discogsController)
// 	.when(new Telegram.TextCommand('/search', 'searchCommand'), discogsController)
//  .when(new Telegram.TextCommand('/username', 'usernameCommand'), discogsController)
// 	.otherwise(new OtherwhiseController())

const Telegraf = require('telegraf')

const telegramToken = '463129846:AAGzPrtx-syuXbe8cc1wVbJLaeWhgocfcjc';

const bot = new Telegraf(telegramToken)
bot.command('hello', (ctx) => ctx.reply('Send me your Discogs username'))
bot.launch()