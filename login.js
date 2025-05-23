// Hiển thị label khi có nội dung
const inputs = document.querySelectorAll('.input-box input');

inputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      input.classList.add('filled');
    } else {
      input.classList.remove('filled');
    }
  });
});

// Tài khoản mặc định
const defaultUser = { email: 'haicb@gmail.com', password: '123' };
let users = JSON.parse(localStorage.getItem('users') || '[]');

// Thêm tài khoản mặc định nếu chưa có
const exists = users.some(user => user.email === defaultUser.email);
if (!exists) {
  users.push(defaultUser);
  localStorage.setItem('users', JSON.stringify(users));
}

// Xử lý form login
const form = document.querySelector('form');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email.endsWith('@gmail.com')) {
    alert('Vui lòng nhập địa chỉ email kết thúc bằng @gmail.com');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    alert('Đăng nhập thành công!');
    window.location.href = 'index.html'; // ✅ Chuyển trang tại đây
  } else {
    alert('Email hoặc mật khẩu không đúng!');
  }
});

// Hiển thị password khi checkbox bật
const showPasswordCheckbox = document.querySelector('#show-password');
showPasswordCheckbox.addEventListener('change', () => {
  passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
});
