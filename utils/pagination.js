/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
function validatePage(pageSize, pageNumber) {
    pageSize = isNaN(pageSize) || pageSize < 1 ? 10 : parseInt(pageSize, 10);
    pageNumber = isNaN(pageNumber) || pageNumber < 1 ? 1 : parseInt(pageNumber, 10);
    return { pageSize, pageNumber };
}

exports.setLimitAndOffset = (pageSize, pageNumber) => {
    const pageSizeAndNumber = validatePage(pageSize, pageNumber);
    const limit = pageSizeAndNumber.pageSize;
    const offset = (pageSizeAndNumber.pageNumber - 1) * pageSizeAndNumber.pageSize;
    return { limit, offset };
};
