// ========================
//  FIREBASE
// ========================
import { initializeApp }
  from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import {
  getFirestore, doc, setDoc, getDoc,
  collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBgh7QT9ORiww11m78X0GxaoPaU_kGB07E",
  authDomain: "estee-lauder-app.firebaseapp.com",
  projectId: "estee-lauder-app",
  storageBucket: "estee-lauder-app.firebasestorage.app",
  messagingSenderId: "585743636422",
  appId: "1:585743636422:web:cb7094f89a04ad6deb84c7"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ========================
// PARA FORMAT FONKSİYONLARI
// ========================

// 1) Yazarken girilen değeri TL formatına çevir
export function formatTLLive(value) {
  value = value.replace(/\D/g, "");
  if (value === "") return "";
  return new Intl.NumberFormat("tr-TR").format(Number(value));
}

// 2) TL → Number (Firestore için)
export function TLtoNumber(value) {
  if (!value) return 0;
  return Number(value.replace(/\./g, "").replace(",", "."));
}

// 3) Number → TL (Dashboard için)
export function numberToTL(num) {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
}

// ========================
// Firestore yardımcıları
// ========================

// Aylık hedefi kaydet
export async function saveMonthlyStats(data) {
  await setDoc(doc(db, "monthlyStats", "current"), data);
}

// Aylık hedefi yükle
export async function loadMonthlyStats() {
  const snap = await getDoc(doc(db, "monthlyStats", "current"));
  return snap.exists() ? snap.data() : null;
}

// Günlük veri kaydet
export async function saveDaily(data) {
  await addDoc(collection(db, "daily"), data);
}

// Günlük verileri getir
export async function loadDailyAll() {
  const snap = await getDocs(collection(db, "daily"));
  let arr = [];
  snap.forEach(doc => arr.push(doc.data()));
  return arr;
}
