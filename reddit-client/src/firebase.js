/* eslint-disable */
import firebase from 'firebase';
require('dotenv').config();

console.log(process.env.VUE_APP_APIKEY);
const firebaseConfig = {
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTODOMAIN,
    databaseURL: process.env.VUE_APP_DATABASEURL,
    projectId: process.env.VUE_APP_PROJECTID,
    storageBucket: process.env.VUE_APP_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
    appId: process.env.VUE_APP_APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;