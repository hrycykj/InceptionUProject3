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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/*
docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});
*/
router.get('/test', async function(req, res, next) {
  // res.send('ok')
  let testUserRef = db.collection('users').doc('alovelace')
  let testUser = await testUserRef.get()
  console.log(testUser)
  res.send(testUser);
});

module.exports = router;
