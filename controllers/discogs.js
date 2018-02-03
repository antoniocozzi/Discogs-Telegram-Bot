const Telegram = require('telegram-node-bot')
const Discogs = require('disconnect').Client;
const http = require('http')

class DiscogsController extends Telegram.TelegramBaseController {
     sayHelloHandler($) {
          let db = new Discogs().database();
          let col = new Discogs().user().collection();
          var username = $.message.text.split(' ').slice(1).join(' ');
          col.getReleases(username, 0, {
               page: 1,
               per_page: 10
          }, (err, data) => {
               // $.sendMessage(JSON.stringify(data))
               let releases = data.releases
               console.log(releases)
               for (var release in releases) {
                    let title = releases[release].basic_information.title
                    let artist = releases[release].basic_information.artists[0].name || ''
                    let year = releases[release].basic_information.year
                    let coverImg = releases[release].basic_information.cover_image
                    let releaseAdditionalInfos = releases[release].basic_information.artists[0].resource_url
                    // let vinylLink = JSON.parse(releaseAdditionalInfos)
                    db.getRelease(releases[release].id, (err, data) => {
                         let styles = data.styles;
                         $.sendMessage(
                              `Title: ${title}\nArtist: ${artist}\nYear: ${year}\nGenre: ${this.cycleStyles(styles)}\n
                              ${coverImg}`);
                    })

               }
          });
     }

     cycleStyles(styles = []){
          let styleStr = ''
          for (let style of styles) {
               styleStr += style + ', '
          }
          return styleStr.substr(0, styleStr.length - 2)
     }

     get routes() {
          return {
               'sayHelloCommand': 'sayHelloHandler'
          }
     }
}

module.exports = DiscogsController;