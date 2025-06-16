import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = { /* ...giống như các file khác... */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.querySelector('#reset-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#reset-email').value.trim();

  try {
    await sendPasswordResetEmail(auth, email);
    alert('Đã gửi email khôi phục mật khẩu!');
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
});
