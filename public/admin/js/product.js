// // change status
const buttonChangeStatus = document.querySelectorAll(
  "[button-change-status]"
);
if (buttonChangeStatus.length > 0) {
  const formChangeMulti = document.querySelector("#form-change-status");
  const path = formChangeMulti.getAttribute("data-path");
  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      let statusCurrent = button.dataset.status === "true";
      let id = button.dataset.id || "Không có ID";

      let statusChange = statusCurrent === true ? false : true;
      const action = path +   `/${statusChange}/${id}?_method=PATCH`;
      formChangeMulti.action = action;
      formChangeMulti.submit();
    });
  });
}

// change status multi
const checkboxChangeStatusItem = document.querySelectorAll(".check-item");
const checkboxChangeStatusAll = document.querySelector("#check-all");
const formChangeMulti = document.querySelector("#form-change-multi");
const inputIds = formChangeMulti.querySelector("#ids");
if(checkboxChangeStatusAll){
  let ids = [];
  checkboxChangeStatusAll.addEventListener("click", () => {
    checkboxChangeStatusItem.forEach((checkbox) => {
      checkbox.checked = checkboxChangeStatusAll.checked;
    });
    if(checkboxChangeStatusAll.checked) {
      checkboxChangeStatusItem.forEach((checkbox) => {
        ids.push(checkbox.value);
      });
    }
    else {
      ids = [];
    }
    inputIds.value = ids.join(",");
  });
}
if(checkboxChangeStatusItem.length > 0){
  let checkedCount = 0;
  checkboxChangeStatusItem.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      if(checkbox.checked) {
        checkedCount++;
      }else {
        checkedCount--;
      }
      if(checkedCount === checkboxChangeStatusItem.length) {
        checkboxChangeStatusAll.checked = true;
      }else {
        checkboxChangeStatusAll.checked = false;
      }
      let ids = [];
      checkboxChangeStatusItem.forEach((checkbox) => {
        if(checkbox.checked) {
          ids.push(checkbox.value);
        }
        inputIds.value = ids.join(",");
      });
    });
  });
}
// submit form change status
formChangeMulti.addEventListener("submit", (e) => {
  e.preventDefault();
  const statusChange = formChangeMulti.querySelector("#status-select").value;
  // console.log("Status Change:", statusChange);
  const ids = inputIds.value;
  if (ids.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thay đổi trạng thái");
      return;
  }

  if(statusChange === "delete") {
    let confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (!confirmDelete) {
      return;
    }
  }
  
  formChangeMulti.submit();
});

// delete item
const buttonDelete = document.querySelectorAll("[delete-item-button]");
const deleteForm = document.querySelector('#form-delete-item');
if( buttonDelete.length > 0) {
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      let confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
      if (confirmDelete) {
        let id = button.dataset.id || "Không có ID";
        const path = deleteForm.getAttribute("data-path");
        const action = path + `/${id}?_method=DELETE`;
        deleteForm.action = action;
        deleteForm.submit();
      }
    })
  })
}