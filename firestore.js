// Shared Firebase bootstrap for the digital menu project.
// Firestore + Auth only. Firebase Storage is intentionally NOT used.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, collection,
  getDocs, query, where, orderBy, writeBatch, addDoc, Timestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkDKnpfuxVuRH4g9FwlMBZWCaH3NAfFSs",
  authDomain: "digital-menu-8d2b4.firebaseapp.com",
  projectId: "digital-menu-8d2b4",
  storageBucket: "digital-menu-8d2b4.firebasestorage.app",
  messagingSenderId: "436566477044",
  appId: "1:436566477044:web:2a86cfb212b44229f0b6a1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.FB = {
  db, auth, doc, getDoc, setDoc, updateDoc, onSnapshot, collection,
  getDocs, query, where, orderBy, writeBatch, addDoc, Timestamp,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, signInAnonymously
};

window.db = db;
window.ownerAuth = auth;
window.firestoreModules = {
  db, auth, doc, getDoc, setDoc, updateDoc, onSnapshot, collection,
  getDocs, query, where, orderBy, writeBatch, addDoc, Timestamp,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, signInAnonymously
};

window.getOwnerProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'ownerProfiles', uid));
  return snap.exists() ? snap.data() : null;
};

window.isActiveRestaurantLicense = (data) => {
  if (!data || data.licenseStatus !== 'active') return false;
  if (data.plan === 'lifetime') return true;
  let expiry = null;
  try {
    expiry = data.licenseExpiresAt
      ? (typeof data.licenseExpiresAt.toDate === 'function' ? data.licenseExpiresAt.toDate() : new Date(data.licenseExpiresAt))
      : null;
  } catch (_) { expiry = null; }
  return !!expiry && !Number.isNaN(expiry.getTime()) && expiry.getTime() > Date.now();
};

const isOrdersPage = /(?:^|\/)orders(?:_fixed|_final)?\.html$/i.test(location.pathname);

window.dispatchEvent(new Event('firebase-ready'));
window.dispatchEvent(new Event('firebase-loaded-kitchen'));

if (isOrdersPage) {
  try {
    await signInAnonymously(auth);
    window.dispatchEvent(new Event('firebase-ready-orders'));
  } catch (error) {
    console.error('Anonymous customer authentication failed:', error);
    window.dispatchEvent(new CustomEvent('firebase-orders-auth-error', { detail: error }));
  }
}
