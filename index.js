const Telegraf = require('telegraf');
const Markup = require('telegraf/Markup')
const axios = require('axios');

const telegramToken = '463129846:AAGzPrtx-syuXbe8cc1wVbJLaeWhgocfcjc';
const discogsToken = 'znRRTXbZvhkJWWIDSeBmXftNwHTvTvvhRkFPapit';

const bot = new Telegraf(telegramToken)

bot.command("search", ctx => {
    return ctx.replyWithMarkdown(`Enter something to search.`);
})

bot.on('text', ctx => {
    const query = ctx.message.text;
    let nextPage = 1;
    const url = `https://api.discogs.com/database/search?q=${query}&page=${nextPage}&per_page=15&token=${discogsToken}`;

    axios.get(url)
        .then(response => {
            response.data.results.map(item => {
                if (item.type === "release")
                    return ctx.replyWithPhoto(item.thumb, {
                        caption: `💿 ${item.title}\n`
                    })
            })

            /*
                This piece below is pure madness 🤨
            */

            // nextPage++;
            // return ctx.reply(
            //     query,
            //     Markup.inlineKeyboard([
            //         Markup.callbackButton('➡️ Next page', nextPage),
            //     ]).extra(),
            // );
        })
        .catch(e => {
            console.log(e)
        })
})

bot.startPolling()