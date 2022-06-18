const {initializeApp} =require('firebase/app');

const {getFirestore}=require('firebase/firestore') ;
const { firebaseConfig } =require('./firebase.config');

const app =initializeApp(firebaseConfig);
 const db = getFirestore();
 module.exports={db}
