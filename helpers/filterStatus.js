module.exports = (query) => {
    let filterStatus = [
        {
            name: "All",
            status: "all",
            class: ""
        },
        {
            name: "Active",
            status: "active",
            class: ""
        },
        {
            name: "Inactive",
            status: "inactive",
            class: ""
        }
    ];

    filterStatus = filterStatus.map((status) => {
        if(status.status === query.status) {
            status.class = "isActived";
        }
        return status;
    })
    return filterStatus;
}