const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class BreakerofChains {
  constructor() {
    this.ruler = ''
    this.alliancesObj = {}
    this.highpriest = new (require('./highpriest'))()
    new (require('./kingdom'))("land", "panda")
    new (require('./kingdom'))("water", "octopus")
    new (require('./kingdom'))("ice", "mammoth")
    new (require('./kingdom'))("air", "owl")
    new (require('./kingdom'))("fire", "dragon")
    new (require('./kingdom'))("space", "gorilla")
    this.kingdom = new (require('./kingdom'))()
  }

  processInput(input) {
    switch (input.toLowerCase().trim()) {
      case "who is the ruler of southeros?":
        this.getRulerFromAlliancesSupport()
        break;
      case "allies of ruler?":
        this.getSupportingAlliances()
        break;
    }
  }

  getRulerFromAlliancesSupport() {
    this.ruler.length > 0 ? console.log(this.ruler) : console.log("None")
  }

  getSupportingAlliances() {
    this.kingdom.getAlliances().length > 0 ? console.log(this.alliancesObj[this.ruler]) : console.log("None")
    this.kingdom.getAlliances().length === 0 ? this.getCompetingKingdomAndInitiateBallot() : ''
  }

  getCompetingKingdomAndInitiateBallot() {
    rl.question('Enter the kingdoms competing to be the ruler:', (answer) => {
      let competingKingdomsArray = answer.split(' ')
      return answer.split('').length === 0 ? console.log('Please enter the kingdoms competing to be the ruler') : this.initiateBallotProcess(new Set(competingKingdomsArray), [], competingKingdomsArray, 1)
    });
  }

  initiateBallotProcess(competingKingdomsSet, allianceKingdoms, competingKingdomsArray, ballotattempt) {
    this.kingdom.clearTotalBallotMessages()
    this.kingdom.clearAlliances()
    let totalBallotmessages = this.kingdom.ballotMessagesFormation(competingKingdomsSet, allianceKingdoms, competingKingdomsArray)
    let resultObj = {}
    let kingdomtemp = ''
    let alliancesCount = 0
    let highPriestMessages = this.highpriest.pickMessages(totalBallotmessages)
    resultObj = this.getAlliancesForCompetitingKingdoms(highPriestMessages, alliancesCount, kingdomtemp, resultObj)
    let largestAllianceCount = this.getLargestAllianceCountAndRulingKingdom(resultObj)
    let getTieingKingdomsAndCount = this.getTieingKingdomsAndCount(resultObj, largestAllianceCount.largestElement)

    console.log(`Results after round ${ballotattempt} ballot`)
    for(let i in resultObj) {
      console.log(`Allies for ${i}: ${resultObj[i]}`)
    }

    if(getTieingKingdomsAndCount.tieingKingdomCounter >= 2 || largestAllianceCount.largestElement == 0) {
      return this.initiateBallotProcess(new Set(getTieingKingdomsAndCount.tieingkingdoms), [], getTieingKingdomsAndCount.tieingkingdoms, ballotattempt+1)
    }
    this.ruler = largestAllianceCount.rulerKingdom
  }

  getAlliancesForCompetitingKingdoms(highPriestMessages, alliancesCount, kingdomtemp, resultObj) {
    for(let i=0; i<highPriestMessages.length+1; i++) {

      if(highPriestMessages[i] === undefined || (highPriestMessages[i].split('-')[0] !== kingdomtemp && kingdomtemp !== '')) {
        resultObj[kingdomtemp] = this.kingdom.getAlliances().length ? this.kingdom.getAlliances().length - alliancesCount : 0
        this.alliancesObj[kingdomtemp] = this.kingdom.getAlliances().length > alliancesCount ? this.kingdom.getAlliances().slice(alliancesCount, this.kingdom.getAlliances().length).join(', ') : ''
        alliancesCount = this.kingdom.getAlliances().length
      }
      highPriestMessages[i] != undefined && new Set(this.kingdom.getAlliances()).has(highPriestMessages[i].split('-')[2]) === false ? this.kingdom.validateMessageAndAddAlliance(highPriestMessages[i].split('-')[2], highPriestMessages[i].split('-')[1]) : ''
      kingdomtemp = highPriestMessages[i] != undefined ? highPriestMessages[i].split('-')[0] : '';
    }

    return resultObj
  }

  getLargestAllianceCountAndRulingKingdom(resultObj) {
    let largestElement = 0
    let rulerKingdom = ''

    for(let i in resultObj) {
      if(resultObj[i] > largestElement) {
        largestElement = resultObj[i]
        rulerKingdom = i
      }
    }

    return { largestElement: largestElement, rulerKingdom: rulerKingdom }
  }

  getTieingKingdomsAndCount(resultObj, largestElement) {
    let largestElementCounter = 0
    let tieingkingdoms = []

    for(let i in resultObj) {
      if(resultObj[i] == largestElement) {
        tieingkingdoms.push(i)
        largestElementCounter++;
      }
    }

    return { tieingKingdomCounter: largestElementCounter, tieingkingdoms: tieingkingdoms };
  }
}

let breakerOfChainsObj = new BreakerofChains()
rl.on('line', (input) => {
  breakerOfChainsObj.processInput(input)
});
