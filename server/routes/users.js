const express = require('express');
const router = express.Router();
const db = require('../db.js')

/*
// future feature: Group of user doing the same quest
let user = {
  uid: string,
  // userType: number,
  username: stirng,
  currentQuest: quest,
  completedQuests: quest[],
  coins: coins[],
  baseLocation: string,
}
*/

/* GET a user by uid. */
router.get('/:uid', function(req, res, next) {
  res.send('ok');
});

/* Log user out  */
router.post('logOut/:uid', function(req, res, next) {
  res.send('ok');
});

/* update a user by uid. */
router.put('/:uid', function(req, res, next) {
  res.send('ok');
});

//test
router.get('/test', async function(req, res, next) {
  // res.send('ok')
  let testUserRef = db.collection('users').doc('alovelace')
  let testUser = await testUserRef.get()
  console.log(testUser)
  res.send(testUser);
});

module.exports = router;
