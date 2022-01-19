const db = require('../db.js')

const CHECKPOINTS_COLLECTION = 'checkPoints'
const checkpointCollectionRef = db.collection(CHECKPOINTS_COLLECTION)

const getAllCheckPoints = async() =>{
  const checkPointRef = await checkpointCollectionRef.get();
  const checkPoints = []
  checkPointRef.forEach(cp =>{
    checkPoints.push(cp.data())
  })
  return checkPoints
}

const getCheckPointById = async (id) =>{
  let checkPointRef = checkpointCollectionRef.doc(id)
  checkPointRef = await checkPointRef.get()
  if(!checkPointRef.exists)
    return {}
  else
    return checkPointRef.data()
}

module.exports = {
  getAllCheckPoints,
  getCheckPointById
}