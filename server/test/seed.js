const db = require('../db.js')


/*
  checkPoint = {
    id,
    title: string
    description: stirng,
    completionText: string
    position: {
      longitude: number,
      latitude: number
    },
    objectToFind: {
      format: string,
      url: string
  },
*/
const checkPoints = [
  {
    id: '51.04446032860044_-114.06314510721562',
    title: 'Calgary Tower',
    description: 'Soaring tower with panoramic views from a glass-floored observation deck & a revolving restaurant.',
    completionText: 'You have found Calgary Tower!!',
    position: {
      longitude: 51.04446032860044,
      latitude: -114.06314510721562
    },
    objectToFind: {
      format: 'img',
      url: 'https://lh5.googleusercontent.com/p/AF1QipOMx3tJ2Ms7h_n15HFxZy1-glfcvKVJcIa8eGbl=w408-h510-k-no'
    }
  },

  {
    id: '51.045764204793116_-114.0594014214562',
    title: 'Olympic Plaza',
    description: '1988 Olympic Winter Games venue turned park with a pond, stage & seasonal ice skating.',
    completionText: 'Good place for kids :)',
    position: {
      longitude: 51.045764204793116,
      latitude: -114.0594014214562
    },
    objectToFind: {
      format: 'img',
      url: 'https://lh5.googleusercontent.com/p/AF1QipO_PQjtFM6A3uSFmpN58dz7MHNWzoVuqJRgPxeh=w408-h272-k-no'
    }
  },

  {
    id: '51.04543609241924_-114.05491558653722',
    title: 'Central Library',
    description: 'Public library',
    completionText: 'Central Library checkpoint',
    position: {
      longitude: 51.04543609241924,
      latitude: -114.05491558653722
    },
    objectToFind: {
      format: 'img',
      url: 'https://lh5.googleusercontent.com/p/AF1QipOGobGoJOSUVZq5X4e8-ps9bPT-iYd6MPdfrna2=w408-h271-k-no'
    }
  },
  {
    id: '51.04473959015545_-114.05286204790929',
    title: 'Studio Bell',
    description: 'Exhibits on Canadian music history, hands-on instrument areas & concerts in a contemporary setting.',
    completionText: 'Expolore to see various unique instruments',
    position: {
      longitude: 51.04473959015545,
      latitude: -114.05286204790929
    },
    objectToFind: {
      format: 'img',
      url: 'https://lh5.googleusercontent.com/p/AF1QipNlT2TcGRNLrHNK8HbmtWJTv43w2DqLygIfdIWe=w408-h272-k-no'
    }
  },
  {
    id: '51.04131458482127_-114.06905210018326',
    title: 'Memorial Park Library',
    description: 'Public library',
    completionText: 'Public livrary',
    position: {
      longitude: 51.04131458482127,
      latitude: -114.06905210018326
    },
    objectToFind: {
      format: 'img',
      url: 'https://lh5.googleusercontent.com/p/AF1QipOoe45SxbCVK8dBfm7E290SWdc-1hMfN_wpMynt=w408-h544-k-no'
    }
  },
  {
    id: '51.0402568763395_-114.06063088827496',
    title: 'H mart Calgary Downtown',
    description: 'Asian grocery store chain supplying imported packaged foods',
    completionText: 'Buy someting?',
    position: {
      longitude: 51.0402568763395,
      latitude: -114.06063088827496
    },
    objectToFind: {
      format: 'img',
      url: 'https://lh5.googleusercontent.com/p/AF1QipNY-YMIb6zpHctFuKwlC3rPM4OPCavWalAxj0c1=w408-h544-k-no'
    }
  },
  {
    id: '51.03765773632536_-114.06082117175349',
    title: 'Elbow River Casino',
    description: 'Casino',
    completionText: 'Play',
    position: {
      longitude: 51.03765773632536,
      latitude: -114.06082117175349
    },
    objectToFind: {
      format: 'img',
      url: 'https://lh5.googleusercontent.com/p/AF1QipM7nVmOB38EULXDlOGgvoYh33LRwj_5ctZ5IDMg=w426-h240-k-no'
    }
  },
]


/*
  quest = {
    id,
    creator: user,
    title: string,
    description: stirng,
    completionStory: string,
    location: string,
    estimatedTime: number,
    avgTimeCompleted: number,
    startCount: number,
    completedCount: number,
    likes, number,
    checkPoints: checkPoints[]
  }
*/
const quests = [
  {
    id: 'Downtown Tour Calgary',
    title: 'Downtown Tour Calgary',
    description: 'Downtown Tour Calgary from Calgary Tower to Studio Bell',
    completionStory: 'Well done',
    location: 'Calgary, AB',
    estimatedTime: 3600,
    avgTimeCompleted: 0,
    startCount: 0,
    completedCount: 0,
    likes: 0,
    checkPoints: ['51.04446032860044_-114.06314510721562', '51.045764204793116_-114.0594014214562',
      '51.04543609241924_-114.05491558653722', '51.04473959015545_-114.05286204790929']
  },
  {
    id: 'Walk Calgary Downtown',
    title: 'Walk Calgary Downtown',
    description: 'Let\'s take a walk',
    completionStory: 'Completed!!',
    location: 'Calgary, AB',
    estimatedTime: 2400,
    avgTimeCompleted: 0,
    startCount: 0,
    completedCount: 0,
    likes: 0,
    checkPoints: ['51.04131458482127_-114.06905210018326', '51.0402568763395_-114.06063088827496',
      '51.03765773632536_-114.06082117175349']
  },
]


/*
checkPoints.forEach(checkPoint=>{
  cpRef = db.collection('checkPoints').doc(checkPoint.id)
  cpRef.set(checkPoint)
})

quests.forEach(quest=>{
  questRef = db.collection('quests').doc(quest.id)
  questRef.set(quest)
})
*/
