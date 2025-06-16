import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDX8YppL_Unops23oojvjnVzsq2DYthE2U",
  authDomain: "webiphone-16082006.firebaseapp.com",
  projectId: "webiphone-16082006",
  storageBucket: "webiphone-16082006.firebasestorage.app",
  messagingSenderId: "300025748488",
  appId: "1:300025748488:web:fef5af798c6a747edc05bd",
  measurementId: "G-36LHVL9H8L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const container = document.getElementById("product-container");

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  container.innerHTML = "";

  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "col-md-3 col-sm-6 mb-4";
    div.innerHTML = `
      <div class="card h-100 text-center">
        <img src="${data.image}" class="card-img-top" alt="${data.name}" loading="lazy">
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", loadProducts);
