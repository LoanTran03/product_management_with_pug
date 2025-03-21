// const formFilter = document.querySelector("#formFilter");
// if(formFilter){
//     formFilter.addEventListener("submit", function(e){
//         e.preventDefault();
//         if(formFilter.status.value){
//             switch(formFilter.status.value){
//                 case "all":
//                     window.location.href = `${prefixAdmin}/products`;
//                     break;
//                 case "active":
//                     window.location.href = `${prefixAdmin}/products?status=active`;
//                     break;
//                 case "inactive":
//                     window.location.href = `${prefixAdmin}/products?status=inactive`;
//                     break;
//             }
//         }
//     });
// }

//             .btn-group
// a.btn.btn-primary.isActive(href=`${prefixAdmin}/products`) All
// a.btn.btn-primary(href=`${prefixAdmin}/products?status=active`) Active
// a.btn.btn-primary(href=`${prefixAdmin}/products?status=inactive`) Inactive

// const buttonFilter = document.querySelectorAll(".btn-group a");
// buttonFilter.forEach(button => {
//     button.addEventListener("click", function(e){
//         e.preventDefault();
//         buttonFilter.forEach(btn => btn.classList.remove("isActive"));
//         this.classList.add("isActive");
//     });
// });