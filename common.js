// ========================
//  FIREBASE
// ========================
import { initializeApp }
  from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import {
  getFirestore, doc, setDoc, getDoc,
  collection, addDoc, getDocs, deleteDoc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Firebase yapılandırma
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
//  PARA FORMAT FONKSİYONLARI
// ========================

// 1) Girilen değeri TL formatında yazdır (örn: "10000" → "10.000")
export function formatTLLive(value) {
  value = value.replace(/\D/g, "");
  if (value === "") return "";
  return new Intl.NumberFormat("tr-TR").format(Number(value));
}

// 2) TL formatlı metni sayıya dönüştür (Firestore kaydı için)
export function TLtoNumber(value) {
  if (!value) return 0;
  return Number(value.replace(/\./g, "").replace(",", "."));
}

// 3) Sayıyı TL formatına dönüştür (Dashboard gösterimi)
export function numberToTL(num) {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
}

// ========================
//  FIRESTORE YARDIMCI FONKSİYONLARI
// ========================

// ---- AYLIK HEDEF ----

// Aylık hedefi kaydet
export async function saveMonthlyStats(data) {
  await setDoc(doc(db, "monthlyStats", "current"), data);
}

// Aylık hedefi getir
export async function loadMonthlyStats() {
  const snap = await getDoc(doc(db, "monthlyStats", "current"));
  return snap.exists() ? snap.data() : null;
}

// ---- GÜNLÜK VERİ ----

// Günlük veriyi Firestore'a kaydet
export async function saveDaily(data) {
  await addDoc(collection(db, "daily"), data);
}

// Firestore'dan tüm günlük verileri çek (ID dahil)
export async function loadDailyAll() {
  const snap = await getDocs(collection(db, "daily"));
  let arr = [];

  snap.forEach(d => {
    arr.push({
      id: d.id,     // → silme butonu için gerekli
      ...d.data()
    });
  });

  return arr;
}

// Günlük veriyi sil
export async function deleteRecord(id) {
  await deleteDoc(doc(db, "daily", id));
}