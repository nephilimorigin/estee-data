// ========================
//  FIREBASE
// ========================
import { initializeApp }
  from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import {
  getFirestore, doc, setDoc, getDoc,
  collection, addDoc, getDocs, deleteDoc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Firebase Yapılandırma
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

// Canlı TL formatı
export function formatTLLive(value) {
  value = value.replace(/\D/g, "");
  if (value === "") return "";
  return new Intl.NumberFormat("tr-TR").format(Number(value));
}

// TL → Number
export function TLtoNumber(value) {
  if (!value) return 0;
  return Number(value.replace(/\./g, "").replace(",", "."));
}

// Number → TL
export function numberToTL(num) {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
}

// ========================
// FIRESTORE FONKSİYONLARI
// ========================

/*
  🔁 AYLIK HEDEFLER
  ✔ Eski global kayıtları algılar
  ✔ Yeni ay bazlı sistemi destekler
*/

// 🔹 AYLIK hedefi KAYDET (geriye dönük uyumlu)
export async function saveMonthlyStats(monthKeyOrData, maybeData) {

  // 🧠 ESKİ KULLANIM: saveMonthlyStats(data)
  if (typeof monthKeyOrData === "object") {
    await setDoc(
      doc(db, "monthlyStats", "current"),
      monthKeyOrData
    );
    return;
  }

  // ✅ YENİ KULLANIM: saveMonthlyStats("2025-01", data)
  const monthKey = monthKeyOrData;
  const data = maybeData;

  await setDoc(
    doc(db, "monthlyStats", "current"),
    { [monthKey]: data },
    { merge: true }
  );
}

// 🔹 AYLIK hedefi YÜKLE
export async function loadMonthlyStats() {
  const snap = await getDoc(doc(db, "monthlyStats", "current"));
  if (!snap.exists()) return {};

  const data = snap.data();

  // ✅ Eğer ay anahtarı varsa → yeni sistem
  const hasMonthKey = Object.keys(data).some(k =>
    /^\d{4}-\d{2}$/.test(k)
  );

  if (hasMonthKey) {
    return data;
  }

  // ⚠️ ESKİ GLOBAL FORMAT → SADECE ARALIK
  // ⬇️ GEREKİRSE BU AYI DEĞİŞTİR
  return {
    "2024-12": data
  };
}

// ========================
// GÜNLÜK VERİLER
// ========================

// Günlük veriyi kaydet
export async function saveDaily(data) {
  await addDoc(collection(db, "daily"), data);
}

// Günlük verileri ID ile birlikte çek
export async function loadDailyAll() {
  const snap = await getDocs(collection(db, "daily"));
  let arr = [];

  snap.forEach(d => {
    arr.push({
      id: d.id,
      ...d.data()
    });
  });

  return arr;
}

// Günlük kaydı sil
export async function deleteRecord(id) {
  await deleteDoc(doc(db, "daily", id));
}