

document.addEventListener("DOMContentLoaded", function () { 
    // Lấy các phần tử cần sử dụng
    const addBtn = document.querySelector('.add_btn');
    const form = document.querySelector('.product_form');
    const closeBtn = document.querySelector('.btn_Dong');
    const otherContent = document.querySelectorAll('body > *:not(.product_form)'); // Lấy tất cả nội dung ngoài form
    const btnCapNhat = document.querySelector('.btn_CapNhat'); // Lấy phần tử btn_CapNhat
    const btnThem = document.querySelector('.btn_Them'); // Lấy phần tử btn_Them
   
    // Ẩn form ban đầu
    form.style.display = 'none';
    btnThem.style.display = 'none'; // Ẩn nút "Thêm mới" ban đầu

    // Khi nhấn vào nút "Thêm sản phẩm +"
    addBtn.addEventListener('click', function () {
        form.style.display = 'block'; // Hiển thị form
        form.style.position = 'fixed'; // Đưa form ra giữa màn hình
        form.style.top = '50%';
        form.style.left = '50%';
        form.style.transform = 'translate(-50%, -50%)'; // Căn giữa form
        form.style.zIndex = '1000'; // Đảm bảo form ở phía trên cùng
  
        // Ngăn cuộn cho phần body khi mở form
        document.body.classList.add('modal-open');
  
        // Ẩn các phần tử khác ngoài form
        otherContent.forEach(element => {
            element.style.display = 'none';
        });
  
        // Ẩn nút Cập nhật và hiện nút "Thêm mới"
        if (btnCapNhat) {
          btnCapNhat.style.display = 'none';
        }
        btnThem.style.display = 'block'; // Hiển thị nút "Thêm mới"
    });
  
    // Khi nhấn vào nút "Close"
    closeBtn.addEventListener('click', function () {
        form.style.display = 'none'; // Ẩn form
  
        // Hiển thị lại các phần tử khác ngoài form
        otherContent.forEach(element => {
            element.style.display = 'block';
        });
  
        // Bỏ trạng thái ẩn của body khi đóng form
        document.body.classList.remove('modal-open');
        
        // Ẩn lại nút "Thêm mới" sau khi đóng form
        btnThem.style.display = 'none';
    });
});
