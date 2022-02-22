const db = require('../db.js')

const REVIEW_COLLECTION = 'review'
const reviewCollectionRef = db.collection(REVIEW_COLLECTION)

const writeReview = async(review) =>{
    const res = await reviewCollectionRef.add(review)
    return res.id
}
const getReviews = async(questId) =>{
  const snapshot = await reviewCollectionRef.where('questId', '==', questId).get();
  if (snapshot.empty) {
    return [];
  }
  const reviews = []
  snapshot.forEach((doc) => {
    let review = doc.data()
    review.id = doc.id
    reviews.push(review)
  });
  return reviews
}

module.exports = {
  writeReview,
  getReviews
}