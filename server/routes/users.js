const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserByUid,
  getUserByUsername,
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

//Get a user by username 
router.get('/username/:username', async function (req, res, next) {
  const username = req.params.username
  const user = await getUserByUsername(username)
  returnedUser = await user[0]
  res.send(returnedUser)
});

/* Log user out  */
// router.post('logOut/:uid', function(req, res, next) {
//   res.send('ok - logout');
// });

/* update a user by uid. */
// router.put('/:uid', function(req, res, next) {
//   res.send('ok - update');
// });

//test
// router.get('/test', async function(req, res, next) {
//   // res.send('ok')
//   let testUserRef = db.collection('users').doc('alovelace')
//   let testUser = await testUserRef.get()
//   console.log(testUser)
//   res.send(testUser);
// });

module.exports = router;
