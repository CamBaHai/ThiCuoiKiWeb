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

const registerForm = document.querySelector('#register-form');
const registerEmail = document.querySelector('#register-email');
const registerPassword = document.querySelector('#register-password');
const confirmPassword = document.querySelector('#confirm-password');
const showRegisterPassword = document.querySelector('#show-register-password');

registerForm.addEventListener('submit', (e) => {
  const email = registerEmail.value.trim();
  const pass = registerPassword.value;
  const confirm = confirmPassword.value;

  if (!email.endsWith('@gmail.com')) {
    e.preventDefault();
    alert('Email phải kết thúc bằng @gmail.com');
  } else if (pass !== confirm) {
    e.preventDefault();
    alert('Mật khẩu xác nhận không khớp');
  }
});

showRegisterPassword.addEventListener('change', () => {
  const type = showRegisterPassword.checked ? 'text' : 'password';
  registerPassword.type = type;
  confirmPassword.type = type;
});
