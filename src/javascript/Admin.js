import Api from "./Api.js";
import phoneS from "./Phone.js";

// import phoneS from "./Phone";
const api = new Api();
let dataSore = [];

const getEle = (id) => document.getElementById(id);

let renderProduct = (producList) =>{
    let content ="";
    producList.forEach((capstone2,index) => {
        content +=`
        <tr>
            <td>${index}</td>
            <td>${capstone2.name}</td>
            <td>${capstone2.price}</td>
            <td>${capstone2.screen}</td>
            <td>${capstone2.backCamera}</td>
            <td>${capstone2.frontCamera}</td>
            <td><img width="150px" src="${capstone2.img}"></td>
            <td>${capstone2.desc}</td>
            <td>${capstone2.type}</td>
            <td>
            <button class="btn_edit" data-modal-target="modal" data-target="#myModal"  onclick="editProduct(${capstone2.id})"> Edit</button>
            <button class="delete mt-3" onclick="deletePhone(${capstone2.id})">Delete</button>
            </td>
        </tr>
        `;
        
    });
    document.getElementById("tblDanhSachSP").innerHTML = content;
};
let showDataProduct = () =>{
    api
    .getListPhone()
    .then((res) =>{
        console.log("res",res.data);
        dataSore = res.data;
        renderProduct(res.data);
    })
    .catch((err) =>{
        console.log("error",err);
    });
};
showDataProduct();


let deletePhone = (id) => {
  console.log("id:", id);
  api
    .deletePhoneById(id)
    .then((res) => {
      console.log("res:", res);
      //   render lại layout sau khi xoá thành công
      showDataProduct();
    })
    .catch((err) => {
      console.log("err:", err);
    });
};
window.deletePhone = deletePhone;

const validateForm = () => {
  let isValid = true;
  const regexAlphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
  // Kiểm tra trường Tên Sản Phẩm
  const name = getEle("TenSP").value;
  if (!name) {
    document.getElementById("errorTenSP").innerText = "Tên sản phẩm không được để trống.";
    isValid = false;
  } else {
    document.getElementById("errorTenSP").innerText = ""; // Xóa lỗi
  }

  // Kiểm tra trường Giá và phải là số
  const price = getEle("GiaSP").value;
  if (!price || isNaN(price)) {
    document.getElementById("errorGiaSP").innerText = "Giá phải là số và không được để trống.";
    isValid = false;
  } else {
    document.getElementById("errorGiaSP").innerText = ""; // Xóa lỗi
  }

 // Kiểm tra trường Screen
 const screen = getEle("Screen").value;
 if (!screen) {
   document.getElementById("errorScreen").innerText = "Screen không được để trống.";
   isValid = false;
 } else if (!regexAlphanumeric.test(screen)) {
   document.getElementById("errorScreen").innerText = "Screen phải chứa cả chữ và số.";
   isValid = false;
 } else {
   document.getElementById("errorScreen").innerText = ""; // Xóa lỗi
 }

 // Kiểm tra Back Camera
 const backCamera = getEle("backCamera").value;
 if (!backCamera) {
   document.getElementById("errorBackCamera").innerText = "Back Camera không được để trống.";
   isValid = false;
 } else if (!regexAlphanumeric.test(backCamera)) {
   document.getElementById("errorBackCamera").innerText = "Back Camera phải chứa cả chữ và số.";
   isValid = false;
 } else {
   document.getElementById("errorBackCamera").innerText = ""; // Xóa lỗi
 }

 // Kiểm tra Front Camera
 const frontCamera = getEle("frontCamera").value;
 if (!frontCamera) {
   document.getElementById("errorFrontCamera").innerText = "Front Camera không được để trống.";
   isValid = false;
 } else if (!regexAlphanumeric.test(frontCamera)) {
   document.getElementById("errorFrontCamera").innerText = "Front Camera phải chứa cả chữ và số.";
   isValid = false;
 } else {
   document.getElementById("errorFrontCamera").innerText = ""; // Xóa lỗi
 }

  // Kiểm tra Img (select)
  const img = getEle("loai").value;
  if (!img) {
    document.getElementById("errorLoai").innerText = "Vui lòng chọn một ảnh.";
    isValid = false;
  } else {
    document.getElementById("errorLoai").innerText = ""; // Xóa lỗi
  }

  // Kiểm tra Desc
  const desc = getEle("MoTa").value;
  if (!desc) {
    document.getElementById("errorMoTa").innerText = "Mô tả không được để trống.";
    isValid = false;
  } else {
    document.getElementById("errorMoTa").innerText = ""; // Xóa lỗi
  }

  // Kiểm tra Type (select)
  const type = getEle("Type").value;
  if (!type) {
    document.getElementById("errorType").innerText = "Vui lòng chọn loại sản phẩm.";
    isValid = false;
  } else {
    document.getElementById("errorType").innerText = ""; // Xóa lỗi
  }

  return isValid; // Trả về true nếu tất cả hợp lệ
};


const addProduct = () => {
  
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";

  if (!validateForm()) {
    return; // Ngăn gửi form nếu có lỗi
  }
  // Lấy giá trị từ form
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const screen = getEle("Screen").value;
  const backCamera = getEle("backCamera").value;
  const frontCamera = getEle("frontCamera").value;
  const img = getEle("loai").value;
  const desc = getEle("MoTa").value;
  const type = getEle("Type").value;



  // Tạo đối tượng sản phẩm mới
  const capstone2 = new phoneS("", name, price, screen, backCamera, frontCamera, img, desc, type);

  // Gọi API để thêm sản phẩm mới
  console.log(capstone2);  // Xem đối tượng trước khi gửi
  api.addPhone(capstone2)
    .then((result) => {
      console.log("Kết quả thêm sản phẩm:", result);
      showDataProduct();
     
      document.getElementsByClassName("btn_Dong")[0].click();
    })
    .catch((error) => {
      console.log("Lỗi khi thêm sản phẩm:", error);
    });
  
};


window.addProduct = addProduct;

let selectedProductId = null; // Biến toàn cục để lưu ID sản phẩm được chọn

const editProduct = (id) => {
  selectedProductId = id; // Lưu ID sản phẩm vào biến toàn cục
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";

  // Hiển thị form
  const form = document.querySelector('.product_form');
  form.style.display = 'block';
  form.style.position = 'fixed';
  form.style.top = '50%';
  form.style.left = '50%';
  form.style.transform = 'translate(-50%, -50%)';
  form.style.zIndex = '1000';

  const addButton = document.querySelector('.btn_Them');
  addButton.style.display = 'none'; // Ẩn nút "Thêm mới"
  const updateButton = document.querySelector('.btn_CapNhat');
  updateButton.style.display = 'block';

  const otherContent = document.querySelectorAll('body > *:not(.product_form)');
  otherContent.forEach((element) => {
    if (element !== form) {
      element.style.display = 'none';
    }
  });

  // Gọi API để lấy dữ liệu của sản phẩm theo ID
  api.getPhoneById(id)
    .then((result) => {
      const phone = result.data;
      getEle("TenSP").value = phone.name;
      getEle("GiaSP").value = phone.price;
      getEle("Screen").value = phone.screen;
      getEle("backCamera").value = phone.backCamera;
      getEle("frontCamera").value = phone.frontCamera;
      getEle("loai").value = phone.img;
      getEle("MoTa").value = phone.desc;
      getEle("Type").value = phone.type;
    })
    .catch((error) => {
      console.log("error:", error);
    });
};

const updateProduct = () => {
  if (!validateForm()) {
    return; // Ngăn gửi form nếu có lỗi
  }
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const screen = getEle("Screen").value;
  const backCamera = getEle("backCamera").value;
  const frontCamera = getEle("frontCamera").value;
  const img = getEle("loai").value;
  const desc = getEle("MoTa").value;
  const type = getEle("Type").value;

  if (!selectedProductId) {
    console.log("Không có ID sản phẩm để cập nhật.");
    return;
  }

  const capstone2 = new phoneS(selectedProductId, name, price, screen, backCamera, frontCamera, img, desc, type);

  api.updatePhoneById(capstone2)
    .then((result) => {
      console.log("Cập nhật thành công:", result);
      showDataProduct(); // Cập nhật lại danh sách sản phẩm
      document.getElementsByClassName("btn_Dong")[0].click(); // Đóng modal
    })
    .catch((error) => {
      console.log("Lỗi khi cập nhật sản phẩm:", error);
    });
};

window.editProduct = editProduct;
window.updateProduct = updateProduct;

getEle("search-navbars").addEventListener("keyup", () => {
  const keyword = getEle("search-navbars").value;

  const dataFilter = dataSore.filter((phoneS) => {
    return phoneS.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
  });

  renderProduct(dataFilter);
});
// Sự kiện khi người dùng thay đổi lựa chọn trong dropdown sắp xếp
getEle("sortOptions").addEventListener("change", function () {
  const sortOption = getEle("sortOptions").value;

  // Sao chép danh sách sản phẩm hiện tại để tránh ảnh hưởng đến bản gốc
  let sortedData = [...dataSore];

  if (sortOption === "loai1") {
    // Sắp xếp giá từ bé đến lớn
    sortedData.sort((a, b) => a.price - b.price);
  } else if (sortOption === "loai2") {
    // Sắp xếp giá từ lớn đến bé
    sortedData.sort((a, b) => b.price - a.price);
  }

  // Hiển thị lại danh sách sản phẩm sau khi sắp xếp
  renderProduct(sortedData);
});
















