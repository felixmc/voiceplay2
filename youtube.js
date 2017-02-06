const ytdl = require('ytdl-core')
const youtube = new (require('youtube-node'))()

exports.name = 'YouTube'
exports.intents = {
  PlayVideo: (intent, cb) => {
    const title = intent.slots.Title.value
    youtube.setKey(process.env.YOUTUBE_KEY)
    youtube.addParam('type', 'video')
    youtube.search(title, 10, (err, result) => {
      if (!err && result && result.items) {
        const item = result.items[0]
        const url = 'https://192.168.1.135/youtube/' + item.id.videoId
        console.log('preparing video..', item, 'https://www.youtube.com/watch?v=' + item.id.videoId)
        // cb({ text: `Playing "${item.snippet.title}" from YouTube`, shouldEndSession: true, mediaUrl: url })
        ytdl.getInfo('https://www.youtube.com/watch?v=' + item.id.videoId,
           { quality: 'highest', filter: format => format.container === 'mp4' },
            (err, info) => {
              if (err || !info || !info.formats.length) {
                cb({ text: `Trouble playing YouTube video, please try again later.`, shouldEndSession: true })
              }  else {
                const video = info.formats[0]
                cb({ text: `Playing "${item.snippet.title}" from YouTube`, shouldEndSession: true, mediaUrl: decodeURIComponent(video.url) })
              }
            })
      } else {
        cb({ text: 'I could not find any results. Play something else?', shouldEndSession: false })
      }
    })
  },
}
