import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const showPasswordCheckbox = document.getElementById('show-password');

  showPasswordCheckbox.addEventListener('change', () => {
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email.endsWith('@gmail.com')) {
      alert('Vui lòng nhập email kết thúc bằng @gmail.com');
      return;
    }

    // Kiểm tra nếu đúng email + mật khẩu admin cố định thì đăng nhập luôn
    if (email === 'haicb@gmail.com' && password === '123456') {
      alert('Đăng nhập thành công với quyền Admin');
      localStorage.setItem('user', JSON.stringify({
        uid: 'admin-fixed-uid',
        email,
        fullName: 'Admin',
        username: 'admin',
        role: 'admin'
      }));
      window.location.href = 'index.html'; // Chuyển về trang index.html
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert('Vui lòng xác minh email trước khi đăng nhập. Email xác minh đã được gửi lại.');
        await sendEmailVerification(user);
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        fullName: userData.fullName || "",
        username: userData.username || "",
        role: userData.role || "user"
      }));

      window.location.href = 'index.html'; // Dù là admin hay user đều về index.html

    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('Tài khoản không tồn tại. Vui lòng đăng ký.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Sai mật khẩu.');
      } else {
        alert('Lỗi đăng nhập: ' + error.message);
      }
    }
  });
});
