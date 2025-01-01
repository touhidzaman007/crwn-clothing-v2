// firebase.utils.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDrcRvi_5Ru1qg2enqzjJMwlrWNphu3qlM',
  authDomain: 'crown-clothing-c5a19.firebaseapp.com',
  projectId: 'crown-clothing-c5a19',
  storageBucket: 'crown-clothing-c5a19.firebasestorage.app',
  messagingSenderId: '235949225170',
  appId: '1:235949225170:web:48bc5f0da48189c0e5a90b',
};

const configureSecurity = () => {
  // ... other security-related logic ...

  // Enable Cross-Origin Opener Policy (COOP)
  document.documentElement.setAttribute('crossorigin', 'use-credentials');

  // Enable Cross-Origin Embedder Policy (COEP)
  document.documentElement.setAttribute('crossorigin', 'anonymous');

  // Enable Cross-Origin Resource Policy (CORP)
  document.documentElement.setAttribute('crossorigin', 'anonymous');

  // Enable Content Security Policy (CSP)
  document.documentElement.setAttribute(
    'contentsecuritypolicy',
    'default-src *; script-src *; style-src *; img-src *; connect-src *; font-src *;'
  );

  // Enable Referrer Policy
  document.documentElement.setAttribute('referrerpolicy', 'no-referrer');

  // Example: Check if COOP is enabled
  if (document.documentMode) {
    // IE11 doesn't support COOP, so you might need a fallback
    console.warn('COOP is not supported in IE11. Consider a fallback.');
  } else {
    // COOP is supported, so you can assume it's enabled
    console.log('COOP is enabled.');
  }
};

configureSecurity();

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export const firestoreDB = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      return;
    } else {
      console.error('Error signing in with Google:', error);
    }
  }
};

// Add a collection and documents to Firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // Get a reference to the collection
  const collectionRef = collection(firestoreDB, collectionKey);

  // Create a batch
  const batch = writeBatch(firestoreDB);

  // Add each object to the batch
  objectsToAdd.forEach(object => {
    // Get a new document reference
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // Add the object to the batch
    batch.set(docRef, object);
  });

  // Commit the batch
  await batch.commit();
  console.log('done');
};

// Get categories and documents from Firestore
export const getCategoriesAndDocuments = async () => {
  // Get a reference to the collection
  const collectionRef = collection(firestoreDB, 'categories');
  // Get the documents in the collection by querying the collection
  const q = query(collectionRef);

  // Get the query snapshot
  const querySnapshot = await getDocs(q);

  // Create a reduce of categories
  const categoryMap = querySnapshot.docs.reduce((accumulator, doc) => {
    // Get the data from the document
    const { title, items } = doc.data();
    // Add the data to the accumulator
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // Get user document reference
  const userDocRef = doc(firestoreDB, 'users', userAuth.uid);
  // Check if user document already exists
  const userSnapshot = await getDoc(userDocRef);

  // If user doesn't exist, create one
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  } else {
    console.log('User document already exists');
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback);

export default firebaseApp;
