const Telegram = require('telegram-node-bot')
const Discogs = require('disconnect').Client;
const http = require('http')
const axios = require('axios')
let db = new Discogs().database();
let collection = new Discogs().user().collection();

class DiscogsController extends Telegram.TelegramBaseController {
     sayHelloHandler($) {
          var username;
          $.sendMessage('Send me your Discogs username')
          $.waitForRequest
               .then($ => {
                    username = $.message.text
                    $.runMenu({
                         message: `Hi, ${username}!`,
                         options: {
                              parse_mode: 'Markdown' // in options field you can pass some additional data, like parse_mode
                         },
                         'Show my collection': () => { //will be executed at any other message
                              collection.getReleases(username, 0, {
                                   page: 1,
                                   per_page: 10
                              }, (err, data) => {
                                   // $.sendMessage(JSON.stringify(data))
                                   let releases = data.releases;
                                   for (var release in releases) {
                                        let title = releases[release].basic_information.title
                                        let artist = releases[release].basic_information.artists[0].name || ''
                                        let year = releases[release].basic_information.year
                                        let coverImg = releases[release].basic_information.cover_image
                                        let releaseAdditionalInfos = releases[release].basic_information.artists[0].resource_url
                                        let label = releases[release].basic_information.labels[0].name;
                                        let categoryNumber = releases[release].basic_information.labels[0].catno;
                                        // let vinylLink = JSON.parse(releaseAdditionalInfos)
                                        db.getRelease(releases[release].id, (err, data) => {
                                             let styles = data.styles;
                                             $.sendMessage(
                                                  `Title: ${title}\nArtist: ${artist}\nYear: ${year}\nLabel: ${label}\nCategory Name: ${categoryNumber}\nGenres: ${this.cycleStyles(styles)}\n
                                        ${coverImg}`);
                                        })
                                   }
                              });
                         }
                    })
               })
               .catch(e => {
                    console.log(e)
               })
     }

     //makes a simple search on the db
     searchHandler($) {
          var query
          $.sendMessage('Send me something to search')
          $.waitForRequest
               .then($ => {
                    query = $.message.text

                    axios.get(`https://api.discogs.com/database/search?q=${query}`)
                         .then(response => {
                              $.sendMessage(response)
                         })
                         .catch(e => {
                              $.sendMessage(e)
                         })
               })
     }

     cycleStyles(styles = []) {
          let styleStr = ''
          for (let style of styles) {
               styleStr += style + ', '
          }
          return styleStr.substr(0, styleStr.length - 2)
     }

     get routes() {
          return {
               'sayHelloCommand': 'sayHelloHandler',
               'searchCommand': 'searchHandler'
          }
     }
}

module.exports = DiscogsController;