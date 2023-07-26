import firebase from 'firebase';
import firestore from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAcRvJbJ40F91nMIc8z52gK-AsyOSqAYW8',
  authDomain: 'basiccrud-c44ec.firebaseapp.com',
  projectId: 'basiccrud-c44ec',
  storageBucket: 'basiccrud-c44ec.appspot.com',
  messagingSenderId: '467255812571',
  appId: '1:467255812571:web:c8240ca11a63cf9bd407fe',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore();
