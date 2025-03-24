module.exports = (page, productsCount) => {
    let objectPagination = {
        currentPage: 1,
        limitItems: 4
    };

    if (page) {
        objectPagination.currentPage = parseInt(page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    objectPagination.totalPage = Math.ceil(productsCount / objectPagination.limitItems);

    return objectPagination;
};
