import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, update, child, remove, onValue, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPLSt21cRCgUsL3QA2TakbI0af07zQKsM",
  authDomain: "whoisitgame.firebaseapp.com",
  databaseURL: "https://whoisitgame-default-rtdb.firebaseio.com",
  projectId: "whoisitgame",
  storageBucket: "whoisitgame.firebasestorage.app",
  messagingSenderId: "347423883446",
  appId: "1:347423883446:web:9c435668649ec0e8d76617"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, update, child, remove, onValue, push };

