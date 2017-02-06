#!/usr/bin/env node

//// REQUIREMENTS

//// - YouTube API Key, availabe via the Google Developers Console.
//// - Amazon Web Services Account

const server = require('./server.js')

server.configure({
  iTunesPath: '/home/pi/media',
  youtubeApiKey: process.env.YOUTUBE_KEY,
  port: 3112
})

server.start()
