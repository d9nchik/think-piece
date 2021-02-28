import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCXxtR8FAQSotTV5oYhCaZGgQXoxA5FsKs',
  authDomain: 'thank-peace-live.firebaseapp.com',
  projectId: 'thank-peace-live',
  storageBucket: 'thank-peace-live.appspot.com',
  messagingSenderId: '989685199269',
  appId: '1:989685199269:web:3cb80f033b4813c5dbb84c',
  measurementId: 'G-D6YW5W5W7B',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Is not best practice. Remove in prod
window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = uid => {
  if (!uid) {
    return null;
  }

  try {
    return firestore.collection('users').doc(uid);
  } catch (err) {
    console.error('Error fetching user', err);
  }
};

export default firebase;
