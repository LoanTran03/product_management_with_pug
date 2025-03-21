const filterStatus = document.getElementById("filter-status");
if(filterStatus) {
    filterStatus.addEventListener("click", (event) => {
        const buttons = filterStatus.querySelectorAll("button");
        buttons.forEach(button => button.classList.remove("active")); // 👈 Xóa class active

        const status = event.target.textContent.toLowerCase();
        event.target.classList.add("active"); // 👈 Thêm class active

        const url = new URL(window.location.href);
        url.searchParams.set("status", status);

        window.location.href = url
    });
}

const formSearch = document.getElementById("form-search");
if(formSearch) {
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();

        const search = formSearch.querySelector("input[name='search']").value;

        const url = new URL(window.location.href);
        url.searchParams.set("search", search);

        window.location.href = url.toString();
    });
}
