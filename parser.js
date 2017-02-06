const intents = [
  require('./youtube'),
].reduce((intents, app) =>  {
  intents[app.name] = app.intents
  return intents
}, {})

exports.parseIntent = (intent, cb) => {
  const intentParts = intent.name.split('_')
  const appInt = intentParts[0]
  const actionInt = intentParts[1]

  console.log(intents)
  console.log('parsing intent:', appInt, actionInt, intent)

  if (intents[appInt] && intents[appInt][actionInt]) {
    intents[appInt][actionInt](intent, cb)
  } else {
    cb({ text: 'I don\'t follow, could you repeat that?', shouldEndSession: false })
  }
}
