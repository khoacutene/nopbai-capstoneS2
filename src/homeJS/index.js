import ProductPhone from "./product.js";
import Api from "../javascript/Api.js";
const api = new Api();
let listdata = [];
let cart = []; // Biến toàn cục để lưu trữ giỏ hàng
let total = 0

// Hàm hiển thị sản phẩm
let renderProduct = (listProduct) => {
    let content = "";
    listProduct.forEach((product, index) => {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>
                <td><img width="250px" src="${product.img}" alt=""></td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td>
                    <button class="btn_ThemGH bg-slate-500" style="border-radius:50px; padding-left:20px;padding-right:20px;" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.img}')">Thêm vào giỏ hàng</button>
                </td>
            </tr>
        `;
    });
    document.getElementById("tableDanhSach").innerHTML = content;
};

// Hàm lấy danh sách sản phẩm từ API
let showProduct = () => {
    axios({
        url: "https://670fd53ea85f4164ef2c1d34.mockapi.io/capstone2",
        method: "GET",
    })
    .then((res) => {
        listdata = res.data;
        renderProduct(res.data);
    })
    .catch((err) => {
        console.log("error", err);
    });
};
showProduct();

// Hàm lấy element theo ID
const getEld = (id) => document.getElementById(id);

// Hàm thêm sản phẩm vào giỏ hàng
const addProduct = () => {
    const name = getEld("tensp").value ? getEld("tensp").value : 'sahdga';
    const price = getEld("price-gia").value;
    const desc = getEld("desc-moTa").value;
    const img = getEld("img-hinh").value;
    const type = getEld("chonSanPham").value;

    const product = new ProductPhone("", name, price, "plapla", "hehehe", "hohoho", img, desc, type);
    axios({
        url: `https://670fd53ea85f4164ef2c1d34.mockapi.io/capstone2`,
        method: "POST",
        data: product,
    })
    .then((result) => {
        console.log("result", result);
        showProduct();
    })
    .catch((error) => {
        console.log("error", error);
    });
    addLocalStorage()
};
window.addProduct = addProduct;

// Hàm lọc sản phẩm
const filterProducts = () => {
    const selectedType = document.getElementById("productType").value; // Lấy giá trị loại sản phẩm đã chọn
    let filteredProducts;

    if (selectedType === "") {
        filteredProducts = listdata; // Nếu không có loại nào chọn, hiển thị tất cả
    } else {
        // Lọc sản phẩm theo loại
        filteredProducts = listdata.filter(product => product.type.toLowerCase() === selectedType.toLowerCase());
    }

    // Gọi hàm renderProduct để cập nhật giao diện
    renderProduct(filteredProducts);
};

// Thêm sự kiện onchange vào dropdown để gọi hàm filterProducts khi có sự thay đổi
document.getElementById("productType").addEventListener("change", filterProducts);

// Hàm thêm sản phẩm vào giỏ hàng
const addToCart = (id, name, price, img) => {
    console.log("Thêm vào giỏ hàng:", { id, name, price, img }); // Kiểm tra xem hàm có được gọi không
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1; // Tăng số lượng nếu sản phẩm đã có
    } else {
        cart.push({ id, name, price, img, quantity: 1, total_item : price }); // Thêm sản phẩm vào giỏ hàng
    }
    renderCart(); // Cập nhật giỏ hàng
    totalCart(); //Cập nhập giá tiền tổng
    addLocalStorage()
};

// Hàm render giỏ hàng
const renderCart = () => {
    let content = "";
    if (cart.length === 0) {
        content = `<tr><td colspan="5">Giỏ hàng trống</td></tr>`; // Thông báo khi giỏ hàng trống
    } else {
        cart.forEach((item, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td><img width="100px" src="${item.img}" alt=""></td>
                    <td>
                        <button onclick="changeQuantity('${item.id}', -1)">[-]</button>
                        ${item.quantity}
                        <button onclick="changeQuantity('${item.id}', 1)">[+]</button>
                    </td>
                    <td>${item.total_item}</td>
                     <td>
                        <button onclick="removeFromCart('${item.id}')">Xóa</button>
                    </td>
                </tr>
            `;
        });
    }
    document.getElementById("cartTable").innerHTML = content; // Cập nhật giao diện giỏ hàng
    openCart(); // Mở giỏ hàng khi có sản phẩm được thêm vào
};

const changeQuantity = (id, delta) => {
  const item = cart.find(item => item.id === id);
  if (item) {
      item.quantity += delta; // Thay đổi số lượng
      if (item.quantity <= 0) {
          removeFromCart(id); // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
      } else {
          item.total_item = item.price * item.quantity //Tính tiền từng sản phẩm
          renderCart(); // Cập nhật giỏ hàng
      }
  }
  totalCart();
  addLocalStorage()
};
// Tính tổng sản phẩm
const totalCart = () => {
    let totalCal = 0;
    console.log(cart);
    for (let i = 0; i < cart.length; i++) {
      totalCal += cart[i].total_item
      console.log(cart[i].total_item);
    }
    total = totalCal;
    document.getElementById("totalCart").innerHTML = ` ${total.toLocaleString()} VND`;
    renderCart()
}

// Hàm mở giỏ hàng
const openCart = () => {
    document.getElementById("cartModal").style.display = "block"; // Hiện giỏ hàng
    document.body.style.overflow = "hidden"; // Ẩn cuộn trang
};

// Hàm đóng giỏ hàng
const closeCart = () => {
    document.getElementById("cartModal").style.display = "none"; // Ẩn giỏ hàng
    document.body.style.overflow = "auto"; // Hiện lại cuộn trang
};
// Hàm xóa sản phẩm khỏi giỏ hàng
const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id); // Lọc để xóa sản phẩm
  renderCart(); // Cập nhật giỏ hàng
  addLocalStorage()
};
window.removeFromCart = removeFromCart;
// Expose the function to the global scope
window.addToCart = addToCart;
window.closeCart = closeCart;
// Expose the function to the global scope
window.openCart = openCart;
window.changeQuantity = changeQuantity;

const addLocalStorage = () => {
    const setLocalStorage = JSON.stringify(cart)
    localStorage.setItem("cart", setLocalStorage)
}

const getLocalStorage = () => {
    const getLocStog = localStorage.getItem("cart")
    if (getLocStog) {
        cart = JSON.parse(getLocStog)
        renderCart()
    }
}
getLocalStorage()

const btnCheckout = () => {
    alert("Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi");
    cart = [];
    total = 0; 
    document.getElementById("totalCart").innerHTML = " 0 VND"; 
    renderCart(); 
    addLocalStorage(); 
};
window.btnCheckout = btnCheckout