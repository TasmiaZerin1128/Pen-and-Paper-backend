const json2xml = require('js2xmlparser');
const json2html = require('json-to-html');
const json2plain = require('json-to-plain-text');

exports.sendJsonResponse = (res, statusCode, data) => {
    const jsonData = { data };
    this.sendFinalResponse(res, statusCode, jsonData);
};

exports.sendXmlResponse = (res, statusCode, data) => {
    const xmlData = json2xml.parse('data', data);
    this.sendFinalResponse(res, statusCode, xmlData);
};

exports.sendPlainResponse = (res, statusCode, data) => {
    const plainData = json2plain.toPlainText(JSON.parse(JSON.stringify(data)));
    this.sendFinalResponse(res, statusCode, plainData);
};

exports.sendHtmlResponse = (res, statusCode, data) => {
    const htmlData = json2html(JSON.parse(JSON.stringify(data)));
    this.sendFinalResponse(res, statusCode, htmlData);
};

exports.sendFinalResponse = (res, status, data) => {
    res.status(status).send(data);
};

exports.sendResponse = (req, res, statusCode, data) => {
    if (req.headers.accept === 'application/xml' || req.headers.accept === 'text/xml') {
        return this.sendXmlResponse(res, statusCode, data);
    }
    if (req.headers.accept === 'text/html') {
        return this.sendHtmlResponse(res, statusCode, data);
    }
    if (req.headers.accept === 'text/plain') {
        return this.sendPlainResponse(res, statusCode, data);
    }
    return this.sendJsonResponse(res, statusCode, data);
};
