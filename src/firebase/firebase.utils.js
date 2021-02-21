import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBTrNJfE9dXiAnz15-FgTVzAC5dCKvx9Ac",
  authDomain: "crwn-db-dfc98.firebaseapp.com",
  projectId: "crwn-db-dfc98",
  storageBucket: "crwn-db-dfc98.appspot.com",
  messagingSenderId: "520467014923",
  appId: "1:520467014923:web:7e3e23241c07baf04c2e0e",
  measurementId: "G-DQNLG8JXMK",
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
