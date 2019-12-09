
module.exports = class HighPriest {
  constructor() { }

  pickMessages(messages) {
    let highPriestMessages = []
    for(let i=0; i<6; i++) {
      highPriestMessages.push(messages[Math.floor(Math.random() * messages.length)])
    }

    return highPriestMessages
  }
}
