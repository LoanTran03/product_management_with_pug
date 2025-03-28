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
      console.log(statusCurrent);
      console.log(id);
      let statusChange = statusCurrent === true ? false : true;
      const action = path +   `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}