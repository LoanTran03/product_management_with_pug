// const e = require("express");
const filterStatus = document.getElementById("filter-status");
if (filterStatus) {
  filterStatus.addEventListener("click", (event) => {
    const buttons = filterStatus.querySelectorAll("button");
    const status = event.target.textContent.toLowerCase();
    console.log('status', status);
    console.log('event.target', event.target);
    const url = new URL(window.location.href);
    url.searchParams.set("status", status);
    window.location.href = url;
  });
}

const formSearch = document.getElementById("form-search");
if (formSearch) {
  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();

    const search = formSearch.querySelector("input[name='search']").value;

    const url = new URL(window.location.href);
    url.searchParams.set("search", search);

    window.location.href = url;
  });
}

// Pagination 
const buttonPagination = document.querySelectorAll("[button-pagination]");
// console.log(buttonPagination);
if(buttonPagination){
  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      console.log(page);
      const url = new URL(window.location.href);
      url.searchParams.set("page", page);
      window.location.href = url.toString();
  });
});
}

// Upload image preview
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if(file){
      uploadImagePreview.src = URL.createObjectURL(file);
      uploadImagePreview.style.display = "block";
    }
  })
}
// End Upload image preview
