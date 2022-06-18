import {initializeApp} from 'firebase/app';

import 'firebase/firestore';
import {getAuth,signInWithPopup,onAuthStateChanged,signOut} from 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import { doc,setDoc,getDoc,getFirestore} from 'firebase/firestore';


export const app =initializeApp(firebaseConfig);
export const db = getFirestore();
 
