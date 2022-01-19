const db = require('../db.js')
const QUESTS_COLLECTION = 'quests'
const questCollectionRef = db.collection(QUESTS_COLLECTION)
const { getCheckPointById } = require('./checkPoint')

const getAllQuests = async () => {
  const questRef = await questCollectionRef.get();
  const quests = []
  questRef.forEach(quest => {
    quests.push(quest.data())
  })
  return quests
}

const getQuestById = async (id) => {
  let questRef = questCollectionRef.doc(id)
  let quest = await questRef.get()
  if (!quest.exists)
    return {}
  else {
    quest = quest.data()
    // get all checkpoint info
    await Promise.all(
      quest.checkPoints.map(async (cpId, i) => {
      let cp = await getCheckPointById(cpId)
      quest.checkPoints[i] = cp
    }))
    return quest
  }
}

const getQuestsByLocation = async (location) => {
  const quests = []
  let questRef = await questCollectionRef.where('location', '==', location).get();
  questRef.forEach(quest => {
    quests.push(quest.data())
  })
  return quests
}

const getQuestByCreator = async (id) => {
  const quests = []
  let questRef = await questCollectionRef.where('creator', '==', id).get();
  questRef.forEach(quest => {
    quests.push(quest.data())
  })
  return quests
}

module.exports = {
  getAllQuests,
  getQuestById,
  getQuestsByLocation,
  getQuestByCreator
}