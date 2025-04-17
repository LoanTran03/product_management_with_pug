// Change status for single item
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  const formChangeMulti = document.querySelector("#form-change-status");
  const path = formChangeMulti.getAttribute("data-path");

  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      let statusCurrent = button.dataset.status === "true";
      let id = button.dataset.id || "Không có ID";
      let statusChange = !statusCurrent;
      const action = `${path}/${statusChange}/${id}?_method=PATCH`;
      formChangeMulti.action = action;
      formChangeMulti.submit();
    });
  });
}

// Change status for multiple items
const checkboxChangeStatusItem = document.querySelectorAll(".check-item");
const checkboxChangeStatusAll = document.querySelector("#check-all");
const formChangeMulti = document.querySelector("#form-change-multi");
const inputIds = formChangeMulti.querySelector("#ids");
const statusChange = formChangeMulti.querySelector("#status-select");

if (checkboxChangeStatusAll) {
  let ids = [];
  checkboxChangeStatusAll.addEventListener("click", () => {
    checkboxChangeStatusItem.forEach((checkbox) => {
      checkbox.checked = checkboxChangeStatusAll.checked;
    });
    // if checkboxChangeStatusAll is checked, get all id - position
    if (statusChange.value === "change-position") {
      checkboxChangeStatusItem.forEach((checkbox) => {
        let positionInput = checkbox
          .closest("tr")
          .querySelector("input[name='position']");
        let positionValue = positionInput ? positionInput.value : 0;
        ids.push(`${checkbox.value}-${positionValue}`);
      });
    }
    console.log("IDs:", ids);
    inputIds.value = ids.join(",");
  });
}

// Handle checkbox item selection
if (checkboxChangeStatusItem.length > 0) {
  let checkedCount = 0;
  checkboxChangeStatusItem.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      checkedCount += checkbox.checked ? 1 : -1;
      checkboxChangeStatusAll.checked =
        checkedCount === checkboxChangeStatusItem.length;

      let ids = [];
      checkboxChangeStatusItem.forEach((checkbox) => {
        if (checkbox.checked) {
          if (statusChange.value === "change-position") {
            let positionInput = checkbox
              .closest("tr")
              .querySelector("input[name='position']");
            let positionValue = positionInput ? positionInput.value : 0;
            ids.push(`${checkbox.value}-${positionValue}`);
          } else {
            ids.push(checkbox.value);
          }
        }
      });
      console.log("IDs:", ids);
      inputIds.value = ids.join(",");
    });
  });
}

if (statusChange) {
  statusChange.addEventListener("change", () => {
    let ids = [];
    checkboxChangeStatusItem.forEach((checkbox) => {
      if (checkbox.checked) {
        if (statusChange.value === "change-position") {
          let positionInput = checkbox
            .closest("tr")
            .querySelector("input[name='position']");
          let positionValue = positionInput ? positionInput.value : 0;
          ids.push(`${checkbox.value}-${positionValue}`);
        } else {
          ids.push(checkbox.value);
        }
      }
    });
    console.log("IDs:", ids);
    inputIds.value = ids.join(",");
  });
}

// Submit form change status
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const ids = inputIds.value;
    if (ids.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thay đổi trạng thái");
      return;
    }

    if (statusChange === "delete") {
      let confirmDelete = confirm(
        "Bạn có chắc chắn muốn xóa sản phẩm này không?"
      );
      if (!confirmDelete) return;
    }
    formChangeMulti.submit();
  });
}

// Delete item
const buttonDelete = document.querySelectorAll("[delete-item-button]");
const deleteForm = document.querySelector("#form-delete-item");
if (buttonDelete.length > 0) {
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      let confirmDelete = confirm(
        "Bạn có chắc chắn muốn xóa sản phẩm này không?"
      );
      if (confirmDelete) {
        let id = button.dataset.id || "Không có ID";
        const path = deleteForm.getAttribute("data-path");
        const action = `${path}/${id}?_method=DELETE`;
        deleteForm.action = action;
        deleteForm.submit();
      }
    });
  });
}

const sortSelect = document.querySelector("[sort-select]");
const sortClear = document.querySelector("[sort-clear]");

// Gán giá trị của select từ URL query
if (sortSelect) {
  const url = new URL(window.location.href);
  const sortValue = url.searchParams.get("sort");
  if (sortValue) {
    sortSelect.value = sortValue;
  }

  // Khi người dùng chọn một option
  sortSelect.addEventListener("change", () => {
    const newValue = sortSelect.value;
    url.searchParams.set("sort", newValue);
    window.location.href = url.toString();
  });
}

// CLEAR SORT
if (sortClear) {
  sortClear.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("sort");
    window.location.href = url.toString(); // reload lại
  });
}
