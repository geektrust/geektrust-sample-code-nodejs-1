const assert = require('assert');
const { goldencrown } = require("../goldencrown.js")
console.log(goldencrown.getRuler())

describe('goldencrown', () => {
  it('should get ruler', () => {
    let result = goldencrown.processInput('who is the ruler of southeros?')
    assert.equal( goldencrown.getRuler(), 'None')
  })

  it('should get alliances', () => {
    let result = goldencrown.processInput('allies of ruler?')
    assert.equal( goldencrown.getAlliances(), 'None')
  })

  it('should send messages', () => {
    goldencrown.processInput('Air, "oaaawaala"')
    goldencrown.processInput('Land, "a1d22n333a4444p"')
    goldencrown.processInput('Ice, "zmzmzmzaztzozh"')
  })

  it('should get ruler from supporting alliances', () => {
    let result = goldencrown.processInput('who is the ruler of southeros?')
    assert.equal( goldencrown.getRulerFromAlliancesSupport(), 'King Shan')
  })

  it('should get alliances of the ruling king', () => {
    let result = goldencrown.processInput('allies of ruler?')
    assert.equal( goldencrown.getSupportingAlliances(), 'air, land, ice')
  })

});
