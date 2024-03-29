const db = require("../db.js");
const USERS_COLLECTION = "users";
const usersCollectionRef = db.collection(USERS_COLLECTION);
const { FieldValue } = require("firebase-admin/firestore");

const getAllUsers = async () => {
  const userRef = await usersCollectionRef.get();
  const users = [];
  userRef.forEach((user) => {
    users.push(user.data());
  });
  return users;
};

const getUserByUid = async (uid) => {
  let userRef = usersCollectionRef.doc(uid);
  let user = await userRef.get();
  if (!user.exists) return { UID: "empty" };
  else {
    user = user.data();
    return user;
  }
};

const getUserByUsername = async (username) => {
  let users = [];
  let userRef = await usersCollectionRef
    .where("username", "==", username)
    .get();
  userRef.forEach((user) => {
    users.push(user.data());
  });
  return users;
};

const createUserByUid = async (uid, userProfile) => {
  let res = await usersCollectionRef.doc(uid).set(userProfile);
  console.log(
    `inside the create user by UID function with ${uid} with results`,
    res
  );
  return res;
};

const updateUserByUid = async (uid, userProfileUpdates) => {
  let res = await usersCollectionRef.doc(uid).update(userProfileUpdates);
  console.log(
    `inside the update user by UID function with ${uid} with results`,
    res
  );
  return res;
};

const updateCompletedQuest = async (uid, userCompletedQuest) => {
  console.log(
    "inside the updateCompletedQuest database call",
    userCompletedQuest
  );
  let res = await usersCollectionRef
    .doc(uid)
    .update({ completedQuests: FieldValue.arrayUnion(userCompletedQuest) });
  console.log(
    `inside the update completed quest by UID function with ${uid} with results`,
    res
  );
  return res;
};

const updateNumberOfCoins = async (uid, userCoinUpdates) => {
  let res = await usersCollectionRef.doc(uid).update(userCoinUpdates);
  console.log(
    `inside the update coin number by UID function with ${uid} with results`,
    res
  );
  return res;
};

module.exports = {
  getAllUsers,
  getUserByUid,
  getUserByUsername,
  createUserByUid,
  updateUserByUid,
  updateCompletedQuest,
  updateNumberOfCoins,
};
