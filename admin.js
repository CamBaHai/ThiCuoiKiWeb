import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
let currentId = "";

async function loadProducts() {
  productList.innerHTML = `<p class="text-center text-muted">Đang tải sản phẩm...</p>`;
  
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    productList.innerHTML = "";
    
    if (querySnapshot.empty) {
      productList.innerHTML = `<p class="text-center text-muted">Chưa có sản phẩm nào.</p>`;
      return;
    }

    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      const div = document.createElement('div');
      div.className = 'product-card';

      div.innerHTML = `
        <img src="${data.image}" alt="${escapeHtml(data.name)}" />
        <div class="product-info">${escapeHtml(data.name)}</div>
        <div class="product-actions">
          <button class="btn btn-sm btn-warning" onclick="editProduct('${docSnap.id}', '${escapeHtml(data.name)}', '${escapeHtml(data.image)}')">Sửa</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct('${docSnap.id}')">Xoá</button>
        </div>
      `;
      productList.appendChild(div);
    });
  } catch (error) {
    productList.innerHTML = `<p class="text-danger text-center">Lỗi tải sản phẩm: ${error.message}</p>`;
  }
}

// Hàm escape dấu nháy để tránh lỗi JS khi gọi onclick
function escapeHtml(text) {
  return text.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

window.editProduct = function (id, name, image) {
  document.getElementById('product-id').value = id;
  document.getElementById('product-name').value = name;
  document.getElementById('product-image').value = image;
  currentId = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.deleteProduct = async function (id) {
  if (confirm("Bạn chắc chắn muốn xoá sản phẩm này?")) {
    try {
      await deleteDoc(doc(db, "products", id));
      alert("Đã xoá sản phẩm.");
      loadProducts();
    } catch (error) {
      alert("Lỗi khi xoá sản phẩm: " + error.message);
    }
  }
}

productForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('product-name').value.trim();
  const image = document.getElementById('product-image').value.trim();

  if (!name || !image) {
    alert("Vui lòng nhập đầy đủ tên và URL hình ảnh sản phẩm.");
    return;
  }

  try {
    if (currentId) {
      const ref = doc(db, "products", currentId);
      await updateDoc(ref, { name, image });
      alert("Đã cập nhật sản phẩm.");
    } else {
      await addDoc(collection(db, "products"), { name, image });
      alert("Đã thêm sản phẩm mới.");
    }
    productForm.reset();
    document.getElementById('product-id').value = "";
    currentId = "";
    loadProducts();
  } catch (error) {
    alert("Lỗi khi lưu sản phẩm: " + error.message);
  }
});

window.onload = loadProducts;
