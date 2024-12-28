import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDrcRvi_5Ru1qg2enqzjJMwlrWNphu3qlM',
  authDomain: 'crown-clothing-c5a19.firebaseapp.com',
  projectId: 'crown-clothing-c5a19',
  storageBucket: 'crown-clothing-c5a19.firebasestorage.app',
  messagingSenderId: '235949225170',
  appId: '1:235949225170:web:48bc5f0da48189c0e5a90b',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const firestoreDB = getFirestore();

export const createUserDocumentFromAuth = async userAuth => {
  if (!userAuth) return;

  const userDocRef = doc(firestoreDB, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('Error creating the user', error.message);
    }
  }
  return userDocRef;
};
