import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAy5xv4aNg81FQM8ioRl4pD4N0f1uL0GJQ",
    authDomain: "letmeask-eac37.firebaseapp.com",
    databaseURL: "https://letmeask-eac37-default-rtdb.firebaseio.com",
    projectId: "letmeask-eac37",
    storageBucket: "letmeask-eac37.appspot.com",
    messagingSenderId: "967417040115",
    appId: "1:967417040115:web:13cc86e2efba583f3cbb86"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }
