const express = require('express');
const router = express.Router();
const {
  writeReview,
  getReviews
} = require('../model/review')
/*
  review = {
    id,
    uid,
    email,
    questId,
    text
*/


//Create a review 
router.post('/', async function (req, res, next) {
    let user = req.body.user;
    let quest = req.body.quest;
    let text = req.body.text
    let review = {
        uid: user.uid,
        email: user.email,
        questId: quest.id,
        text: text,
        createdDate: Date.now()
    }
    let resId = await writeReview(review)
    res.send(resId);
});


//get review for a quest
router.get('/:questId', async function (req, res, next) {
    let questId = req.params.questId;
    const reviews = await getReviews(questId)
    res.send(reviews)
});



module.exports = router;
