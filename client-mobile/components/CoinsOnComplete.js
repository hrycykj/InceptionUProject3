

// const addCoins = () => {
//     db.collection("users").doc(user.uid).update({
//         coins: {
//             user.coins + 10
//         }
// }) 
// }

//   const CheckpointQuestReward = () => {
//     fetch('${HOST_SERVER}/api/users/coins' + user.uid, {
//         method: "PUT",
//         body: JSON.stringify('coins'),
//         headers: { "Content-type": "application/json"},
//     })
//     .then (() => addCoins())
//   }

//   const QuestCompleteReward = () => {
//     fetch('${HOST_SERVER}/api/users/coins' + user.uid, {
//         method: "PUT",
//         body: JSON.stringify('coins'),
//         headers: { "Content-type": "application/json"},
//     })
//     .then (() => addCoins())
//   }



import firebase from 'react-native-firebase';

const ref = firebase.firestore().collection('users').doc('user.uid');

firebase
  .firestore()
  .runTransaction(async transaction => {
    const doc = await transaction.get(ref);

    const newCoins = doc.data().coins + 10;

    transaction.update(ref, {
      coins: newCoins,
    });

    return newCoins;
  })
  .then(newCoins => {
    console.log(
      `Transaction successfully committed and new coins is '${newCoins}'.`
    );
  })

  .catch(error => {
    console.log('Transaction failed: ', error);
  });
