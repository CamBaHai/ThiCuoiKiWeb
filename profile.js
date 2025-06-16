import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// DOM
const form = document.getElementById("profile-form");
const logoutBtn = document.getElementById("logout-btn");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("email").value = user.email;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    document.getElementById("full-name").value = data.fullName || "";
    document.getElementById("username").value = data.username || "";
    document.getElementById("phone").value = data.phone || "";
    document.getElementById("dob").value = data.dob || "";
    document.getElementById("gender").value = data.gender || "Nam";
    document.getElementById("address").value = data.address || "";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const updatedData = {
    fullName: document.getElementById("full-name").value.trim(),
    username: document.getElementById("username").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    address: document.getElementById("address").value.trim(),
    email: user.email
  };

  try {
    await setDoc(doc(db, "users", user.uid), updatedData);
    alert("✅ Thông tin đã được cập nhật!");
  } catch (err) {
    alert("❌ Có lỗi xảy ra: " + err.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  localStorage.removeItem("user");
  window.location.href = "login.html";
});
