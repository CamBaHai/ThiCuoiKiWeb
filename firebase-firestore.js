import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore(app);

// Sau khi tạo tài khoản thành công
await setDoc(doc(db, "users", userCredential.user.uid), {
  fullName: document.getElementById('full-name').value.trim(),
  username: document.getElementById('username').value.trim(),
  phone: document.getElementById('phone').value.trim(),
  dob: document.getElementById('dob').value,
  gender: document.getElementById('gender').value,
  address: document.getElementById('address').value.trim(),
  email: email,
});
