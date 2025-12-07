import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import { getFirestore, collection, addDoc }
    from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBgh7QT9ORiww11m78X0GxaoPaU_kGB07E",
    authDomain: "estee-lauder-app.firebaseapp.com",
    projectId: "estee-lauder-app",
    storageBucket: "estee-lauder-app.firebasestorage.app",
    messagingSenderId: "585743636422",
    appId: "1:585743636422:web:cb7094f89a04ad6deb84c7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Kayıt butonunu dinle
document.getElementById("saveBtn").addEventListener("click", async () => {

    const data = {
        tarih: document.getElementById("tarih").value,
        ciro: Number(document.getElementById("ciro").value),
        yeni: Number(document.getElementById("yeni").value),
        durdurulan: Number(document.getElementById("durdurulan").value),
        satin: Number(document.getElementById("satin").value),
        davet: Number(document.getElementById("davet").value),
        davetsatin: Number(document.getElementById("davetsatin").value),
        not: document.getElementById("not").value,
        createdAt: new Date().toISOString()
    };

    try {
        await addDoc(collection(db, "daily"), data);

        alert("Başarıyla kaydedildi!");
        
        // formu temizle
        document.querySelector("input#tarih").value = "";
        document.querySelectorAll("input").forEach(i => i.value = "");

    } catch (err) {
        console.error(err);
        alert("Kayıt hatası oluştu!");
    }
});
