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

    window.location.href = url.toString();
  });
}
