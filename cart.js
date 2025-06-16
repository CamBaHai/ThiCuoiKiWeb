export function addToCartItem(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingIndex = cart.findIndex(item => item.name === product.name);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`🛒 ${product.name} đã được thêm vào giỏ hàng!`);
}

export function showToast(message, type = 'success') {
  const toastEl = document.getElementById('liveToast');
  toastEl.className = `toast align-items-center text-bg-${type}`;
  document.getElementById('toastMessage').textContent = message;
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}
