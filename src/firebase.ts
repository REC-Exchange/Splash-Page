import _firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD3cXHSdUQiqoQVzYg2P0Rfb03LTB50Kb0',
  authDomain: 'rec-exchange-9750e.firebaseapp.com',
  projectId: 'rec-exchange-9750e',
  storageBucket: 'rec-exchange-9750e.appspot.com',
  messagingSenderId: '747112945903',
  appId: '1:747112945903:web:f84b5cc541b6a648e4231a',
  measurementId: 'G-9KKRWK7GWG'
};

export const app = _firebase.initializeApp(firebaseConfig);
export const auth = _firebase.auth();
export const fireStore = _firebase.firestore();
export const firebase = _firebase;
