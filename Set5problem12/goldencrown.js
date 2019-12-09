const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class GoldenCrown {
  constructor() {
    this.ruler = 'None'
    this.alliance = 'None'
    new (require('./kingdom'))("land", "panda")
    new (require('./kingdom'))("water", "octopus")
    new (require('./kingdom'))("ice", "mammoth")
    new (require('./kingdom'))("air", "owl")
    new (require('./kingdom'))("fire", "dragon")
    new (require('./kingdom'))("space", "gorilla")
    this.kingdom = new (require('./kingdom'))()
  }

  getRuler() {
    return this.ruler
  }

  getAlliances() {
    return this.alliance
  }

  processInput(input) {

    switch (input.toLowerCase().trim()) {
      case "who is the ruler of southeros?":
        this.getRulerFromAlliancesSupport()
        break;
      case "allies of ruler?":
      case "allies of king shan?":
        this.getSupportingAlliances()
        break;
      default:
        this.processIncomingMessage(input)
    }
  }

  getRulerFromAlliancesSupport() {
    this.kingdom.getAlliances().length >= 3 ? console.log("King Shan") : console.log("None")
    if(this.kingdom.getAlliances().length >= 3) {
      this.ruler = 'King Shan'
      return this.ruler
    }
  }

  getSupportingAlliances() {
    this.kingdom.getAlliances().length > 0 ? console.log(this.kingdom.getAlliances().join(', ')) : console.log("None")
    if(this.kingdom.getAlliances().length > 0) {
      this.alliance = this.kingdom.getAlliances().join(', ')
      return this.alliance
    }
  }

  processIncomingMessage(input) {
    let kingdom = input.split(',')[0] ? input.split(',')[0].trim().toLowerCase() : ''
    let message = input.split(',')[1] ? input.split(',')[1].trim().toLowerCase() : ''
    if(kingdom !== "space" && new Set(this.getAlliances()).has(kingdom) === false)
      this.kingdom.validateMessageAndAddAlliance(kingdom, message)
  }
}

let goldencrownObj = new GoldenCrown()
rl.on('line', (input) => {
  goldencrownObj.processInput(input)
});

module.exports = {
  goldencrown: new GoldenCrown()
}
