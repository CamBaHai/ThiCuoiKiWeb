import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, applyActionCode } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const messageDiv = document.getElementById('message');

// Lấy mã xác minh từ URL (oobCode)
const urlParams = new URLSearchParams(window.location.search);
const oobCode = urlParams.get('oobCode');

if (!oobCode) {
  messageDiv.textContent = "Mã xác minh không hợp lệ hoặc không tồn tại.";
  messageDiv.style.color = "red";
} else {
  applyActionCode(auth, oobCode)
    .then(() => {
      messageDiv.textContent = "🎉 Email của bạn đã được xác minh thành công! Bạn có thể đóng trang này và đăng nhập.";
      messageDiv.style.color = "#28a745";  // xanh lá
    })
    .catch((error) => {
      messageDiv.textContent = "❌ Xác minh thất bại: " + error.message;
      messageDiv.style.color = "red";
    });
}
