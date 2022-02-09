const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserByUid,
  getUserByUsername,
  createUserByUid,
  updateUserByUid,
  updateCompletedQuest,
} = require('../model/user')


/*
// future feature: Group of user doing the same quest
let user = {
  uid: string,
  userEmail: string,
  userType: number, // 0 - player, 1 - quest creator, 2 - corporate quest creator, 3 - admin
  username: string,
  currentQuest: quest,
  completedQuests: quest[],
  coins: coins[],
  baseLocation: string,
}
*/



//Get all users
router.get('/', async function (req, res, next) {
  const users = await getAllUsers()
  res.send(users);
});

/* GET a user by uid. */
router.get('/:uid', async function(req, res, next) {
  const uid = req.params.uid
  const user = await getUserByUid(uid)
  res.send(user);
});

/* Get a user by username */ 
router.get('/username/:username', async function (req, res, next) {
  const username = req.params.username
  const user = await getUserByUsername(username)
  returnedUser = await user[0]
  res.send(returnedUser)
});

/* Create user profile by UID */
  router.post('/:uid', async function (req, res, next) {
    const uid=req.params.uid
    const userProfile=req.body
    let createdUid = await createUserByUid(uid, userProfile)
    res.send(`create profile ${uid} with ${userProfile}`);
});

/* update a user by uid. */
router.put('/:uid', async function(req, res, next) {
  const uid=req.params.uid
  const userProfileUpdate=req.body
  let updatedUid = await updateUserByUid(uid, userProfileUpdate)
  res.send(`updated profile ${uid} with ${userProfileUpdate}`);
});

/* update Quest complete by uid. */
router.put('/completedQuest/:uid', async function(req, res, next) {
  console.log('made it into the completedQuest endpoint', req.body)
  const uid=req.params.uid
  const userQuestCompleted=req.body.completedQuest
  let updatedUid = await updateCompletedQuest(uid, userQuestCompleted)
  res.send(`updated profile ${uid} with ${updatedUid}`);
});




//test
// router.get('/test', async function(req, res, next) {
//   // res.send('ok')
//   let testUserRef = db.collection('users').doc('alovelace')
//   let testUser = await testUserRef.get()
//   console.log(testUser)
//   res.send(testUser);
// });

module.exports = router;
