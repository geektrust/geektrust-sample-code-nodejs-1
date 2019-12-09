const ballot = require('./ballot')
var kingdoms = []
var emblems = {}

module.exports = class Kingdom {
  constructor(kingdom, emblem) {
    this.setKingdomEmblems(kingdom, emblem)
    this.alliances = []
    this.ballot = new (require('./ballot'))()
  }

  setKingdomEmblems(kingdom, emblem) {
    if(kingdom && emblem && new Set(kingdoms).has(kingdom) === false) {
      kingdoms.push(kingdom)
      emblems[kingdom] = this.emblemAsObject(emblem)
    }
  }

  getEmblems() {
    return emblems
  }

  emblemAsObject(emblem) {
    return emblem.split('').reduce((total, letter) => {
      total[letter] ? total[letter]++ : total[letter] = 1;
      return total;
    }, {});
  };

  getAlliances() {
    return this.alliances;
  }

  getAllKingdoms() {
    return kingdoms
  }

  clearAlliances() {
    this.alliances = []
  }

  getTotalBallotMessages() {
    return this.totalballotmessages;
  }

  clearTotalBallotMessages() {
    this.ballot.totalballotmessages = [];
  }

  validateMessageAndAddAlliance(kingdom, message) {
    let kingdomemblem = Object.assign({}, this.getEmblems()[kingdom])
    let messageExists = true

    for(let i=0; i<=message.length-1; i++) {
      if(kingdomemblem[message[i].toLowerCase()]) {
        kingdomemblem[message[i].toLowerCase()]--
      }
    }

    for(let i in kingdomemblem) {
      if(kingdomemblem[i] != 0) {
        messageExists = false
      }
    }

    if(messageExists) {
      this.alliances.push(kingdom)
    }
  }

  permutationofKingdoms(alliancekingdom, sendingKingdom, index) {
    this.ballot.totalballotmessages.push(sendingKingdom + '-' + this.ballot.messages()[Math.floor(Math.random() * this.ballot.messages().length)] + '-' + alliancekingdom[index])
    if(index == alliancekingdom.length-1) {
      return
    } else {
      return this.permutationofKingdoms(alliancekingdom, sendingKingdom, index+1)
    }
  }

  ballotMessagesFormation(competingKingdomsSet, allianceKingdoms, competingKingdomsArray) {
    for(let i=0; i<this.getAllKingdoms().length; i++) {
      if(competingKingdomsSet.has(this.getAllKingdoms()[i].toLowerCase()) === false) {
        allianceKingdoms.push(this.getAllKingdoms()[i].toLowerCase())
      }
    }
    for(let i=0; i<competingKingdomsArray.length; i++) {
      if(new Set(this.getAllKingdoms()).has(competingKingdomsArray[i].toLowerCase()) === true) {
        this.permutationofKingdoms(allianceKingdoms, competingKingdomsArray[i], 0)
      }
    }

    return this.ballot.totalballotmessages
  }
}
