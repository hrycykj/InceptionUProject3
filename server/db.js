const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
// const docRef = db.collection('users').doc('alovelace');
/*
docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});
*/

module.exports = db;
