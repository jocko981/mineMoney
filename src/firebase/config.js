import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBxE4Su4WHp1csFPkG0UdOzrYSff6iniFQ",
    authDomain: "minemoney-app.firebaseapp.com",
    projectId: "minemoney-app",
    storageBucket: "minemoney-app.appspot.com",
    messagingSenderId: "907585835051",
    appId: "1:907585835051:web:dc36705f707ce39ed55a6e"
};

// steps to follow:
// init firebase
firebase.initializeApp(firebaseConfig);

// init different services here
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp

// export w/e different objects we want to use in other components in the future
export { projectFirestore, projectAuth, timestamp }