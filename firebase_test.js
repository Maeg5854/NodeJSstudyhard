// API키와 같은 민감 정보를 secret_config.json 파일로 분리했습니다.
// secret_config.json 파일을 로드해서 코드에는 간접적으로 입력합니다.
const firebase = require('firebase/app');
//import { getAuth } from "firebase/auth";
//import { getDatabase } from "firebase/database";
//import { getStorage, ref } from 'firebase/storage';
const secret_config = require("./secret_config.json");

const firebaseConfig = {
    apiKey: secret_config.apiKey,
    authDomain: secret_config.authDomain,
    databaseURL: secret_config.databaseURL,
    projectId: secret_config.projectId,
    storageBucket: secret_config.storageBucket,
    messagingSenderId: secret_config.messagingSenderId,
    appId: secret_config.appId,
    measurementId: secret_config.measurementId
};
  
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.getDatabase();     // 파이어베이스 실시간 데이터베이스
//const storage = getStorage(app);    // 파이어베이스 스토리지


/**
async function getUsers() {
    const userRef = ref(db, 'user/');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.log("no data");
      }
    })
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return userList;
}

getUsers(); */