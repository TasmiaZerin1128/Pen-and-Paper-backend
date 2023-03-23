function validatePage (pageSize, pageNumber) {

    pageSize = ( isNaN(pageSize) || pageSize < 1 ) ? 10 : parseInt(pageSize);
    pageNumber = ( isNaN(pageNumber) || pageNumber < 1 ) ? 1 : parseInt(pageNumber);
    return { pageSize, pageNumber };
}

exports.setLimitAndOffset = (pageSize, pageNumber) => {
    let pageSizeAndNumber = validatePage(pageSize, pageNumber);
    const limit = pageSizeAndNumber.pageSize;
    const offset = (pageSizeAndNumber.pageNumber-1)*pageSizeAndNumber.pageSize;
    return { limit, offset };
}