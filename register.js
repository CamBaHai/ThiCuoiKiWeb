import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const inputs = document.querySelectorAll('.input-box input, .input-box select');
inputs.forEach(input => {
  if (input.value.trim() !== '') input.classList.add('filled');
  input.addEventListener('input', () => {
    input.classList.toggle('filled', input.value.trim() !== '');
  });
});

const registerForm = document.querySelector('#register-form');
const registerEmail = document.querySelector('#register-email');
const registerPassword = document.querySelector('#register-password');
const confirmPassword = document.querySelector('#confirm-password');
const showRegisterPassword = document.querySelector('#show-register-password');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = registerEmail.value.trim();
  const pass = registerPassword.value;
  const confirm = confirmPassword.value;

  if (!email.endsWith('@gmail.com')) {
    alert('Email phải kết thúc bằng @gmail.com');
    return;
  }
  if (pass.length < 6 || !/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) {
    alert('Mật khẩu phải có ít nhất 6 ký tự, 1 chữ in hoa và 1 số');
    return;
  }

  if (pass !== confirm) {
    alert('Mật khẩu xác nhận không khớp');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    await sendEmailVerification(user);

    // ✅ Ghi dữ liệu vào Firestore với role: "user"
    await setDoc(doc(db, "users", user.uid), {
      fullName: document.getElementById('full-name').value.trim(),
      username: document.getElementById('username').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      address: document.getElementById('address').value.trim(),
      email: email,
      role: "user" // ✅ thêm role
    });

    alert("🎉 Đăng ký thành công! Vui lòng kiểm tra email để xác minh trước khi đăng nhập.");
    registerForm.reset();
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 3000);

    inputs.forEach(input => input.classList.remove('filled'));

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Email này đã được đăng ký.');
    } else {
      alert('Lỗi đăng ký: ' + error.message);
    }
  }
});

showRegisterPassword.addEventListener('change', () => {
  const type = showRegisterPassword.checked ? 'text' : 'password';
  registerPassword.type = type;
  confirmPassword.type = type;
});
