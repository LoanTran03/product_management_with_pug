// // change status
const buttonChangeStatus = document.querySelectorAll(
  "[button-change-status]"
);
if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");
  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      let statusCurrent = button.dataset.status === "true";
      let id = button.dataset.id || "Không có ID";

      let statusChange = statusCurrent === true ? false : true;
      const action = path +   `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}

// change status multi
const checkboxChangeStatusItem = document.querySelectorAll(".check-item");
const checkboxChangeStatusAll = document.querySelector("#check-all");
const formChangeStatus = document.querySelector("#form-change-status");
const inputIds = formChangeStatus.querySelector("#ids");
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

// submit form
// PATCH /admin/products/change-status/multi
// module.exports.changeStatusMulti = (req, res) => {
//   res.send("change status multi");
// };
// Cannot GET /admin/null/change-status/multi?_method=PATCH
// form#form-change-status(
//   action=`${prefixAdmin}/products/change-multiple-status`
//   method="POST"
// )
// form#form-change-status(
//   action=`${prefixAdmin}/products/change-multiple-status?_method=PATCH`
//   method="POST"
//   data-statusChange = ``
//   data-ids = ``
// )
formChangeStatus.addEventListener("submit", (e) => {
  e.preventDefault();
  const ids = inputIds.value;
  if (ids.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thay đổi trạng thái");
      return;
  }
  formChangeStatus.submit();
});