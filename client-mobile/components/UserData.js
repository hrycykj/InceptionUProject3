import React, { useState } from 'react';

const UserData = () => {
    const [users, setUsers]=useState({})
    const fbContext = useContext(FirebaseContext);
    const db = fbContext.db;

    const getUsersData = async () => {
        try {
          let collectionRef = collection(db, "users");
          let queryRef = query (collectionRef, orderBy("firstName"));
          let querySnap = await getDocs(queryRef);
          if (querySnap.empty) {
            console.log("No docs found");
          } else {
            let usersData = querySnap.docs.map((doc) => ({
              ...doc.data(),
              DOC_ID: doc.id,
            }));
            setUsers(usersData);
          }
        } catch (ex) {
          console.log("FIRESTORE FAILURE!", ex.message);
        }
      };
    
      return (
        <>
          <button onPress={() => getUsersData()}>GET DATA</button>
          <br />
          {users.map((user) => {
            return (
              <ul key={user.DOC_ID}>
                <li>First Name: {user.firstName}</li>
                <li>Last Name: {user.lastName}</li>
                <li>Location: {user.location}</li>
                <li>Points: {user.points}</li>
                <li>docId: {user.DOC_ID}</li>
              </ul>
            );
          })}
        </>
      );
    };

export default UserData;
