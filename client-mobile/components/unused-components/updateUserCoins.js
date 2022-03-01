import { HOST_SERVER } from "../util/hostServer";

  const updateUserCoins = (uid, coinsEarned) => {
  fetch(`${HOST_SERVER}/api/users/` + uid)
      .then ((fetchedData) => fetchedData.json())
      .then ((userData) => {
        console.log('User data thing', userData)
        let currentCoins = userData?.coins 
        console.log('Current coins inside fetch', currentCoins)
        return currentCoins
      })
      .then ((currentCoins) => {
        let newCoins = currentCoins + coinsEarned
        console.log('Added coins', newCoins)
        return newCoins 
      })
      .then ((newTotalCoins) => {
        fetch(`${HOST_SERVER}/api/users/coins/` + uid, {
          method: "PUT",
          body: JSON.stringify({ coins: newTotalCoins }),
          headers: {
            "Content-Type": "application/json",
          },
        })
      })
  }

  const updateFixer = () => {
    console.log("Please be simple fix")
  }


module.export = {updateUserCoins, updateFixer}