const db = require('../db.js')
const USERS_COLLECTION = 'users'
const usersCollectionRef = db.collection(USERS_COLLECTION)

const getAllUsers = async () => {
  const userRef = await usersCollectionRef.get();
  const users = []
  userRef.forEach(user => {
    users.push(user.data())
  })
  return users
}

const getUserByUid = async (uid) => {
  let userRef = usersCollectionRef.doc(uid)
  let user = await userRef.get()
  if (!user.exists)
    return {}
  else {
    user = user.data()
    return user
  }
}

const getUserByUsername = async (username) => {
  let users=[]
  let userRef = await usersCollectionRef.where('username', '==', username).get();
  userRef.forEach ( user => {
    users.push(user.data())
  })
  return users
  }
  
// const getQuestByCreator = async (id) => {
//   const quests = []
//   let questRef = await questCollectionRef.where('creator', '==', id).get();
//   questRef.forEach(quest => {
//     quests.push(quest.data())
//   })
//   return quests
// }

module.exports = {
  getAllUsers,
  getUserByUid,
  getUserByUsername,
}