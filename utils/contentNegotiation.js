const json2xml = require('xml-js');
const json2html = require('json-to-html');
const json2plain = require('json-to-plain-text');
const { json } = require('body-parser');

exports.sendJsonResponse = (req, res, statusCode, data) => {
    jsonData = { 'data' : data };
    this.sendFinalResponse(req, res, statusCode, jsonData);
}

exports.sendXmlResponse = (req, res, statusCode, data) => {
    var options = {compact: true, ignoreComment: true, spaces: 4};
    var xmlData = json2xml.json2xml(JSON.stringify(data), options);
    this.sendFinalResponse(req, res, statusCode, xmlData);
}

exports.sendPlainResponse = (req, res, statusCode, data) => {
    var plainData = json2plain.toPlainText(JSON.parse(JSON.stringify(data)));
    this.sendFinalResponse(req, res, statusCode, plainData);
}

exports.sendHtmlResponse = (req, res, statusCode, data) => {
    var htmlData = json2html(JSON.parse(JSON.stringify(data)));
    this.sendFinalResponse(req, res, statusCode, htmlData);
}

exports.sendFinalResponse = (req, res, status, data) => {
    res.status(status).send(data);
}

exports.sendResponse = (req, res, statusCode, data) => {
    if(req.headers.accept ==='application/xml' || req.headers.accept === 'text/xml'){
        return this.sendXmlResponse(req, res, statusCode, data);
    }
    if(req.headers.accept === 'text/html'){
        return this.sendHtmlResponse(req, res, statusCode, data);
    }
    if(req.headers.accept === 'text/plain'){
        return this.sendPlainResponse(req, res, statusCode, data);
    }
    return this.sendJsonResponse(req, res, statusCode, data);
}