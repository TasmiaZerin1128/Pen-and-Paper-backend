function validatePage (pageSize, pageNumber) {

    if( !pageSize || isNaN(pageSize) || pageSize < 1 ){
        pageSize = 10;
    }
    
    if( !pageNumber || isNaN(pageNumber) || pageNumber < 1 ){
        pageNumber = 1;
    }
    pageSize = parseInt(pageSize);
    pageNumber = parseInt(pageNumber);
    return { pageSize, pageNumber };
}

exports.setLimitAndOffset = (pageSize, pageNumber) => {
    let pageSizeAndNumber = validatePage(pageSize, pageNumber);
    const limit = pageSizeAndNumber.pageSize;
    const offset = (pageSizeAndNumber.pageNumber-1)*pageSizeAndNumber.pageSize;
    return { limit, offset };
}