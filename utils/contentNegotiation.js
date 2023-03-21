const e = require("express");
const json2xml = require('xml-js');
const json2html = require('node-json2html');
const convertToPlain = require('json-to-plain-text');

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
    this.sendFinalResponse(req, res, statusCode, JSON.stringify(data));
}

exports.sendHtmlResponse = (req, res, statusCode, data) => {
    let template = {
        '<>': 'li',
        html: '${title} - ${description}'
      }
    this.sendFinalResponse(req, res, statusCode, json2html.transform(data, template));
}

exports.sendFinalResponse = (req, res, status, data) => {
    res.status(status).send(data);
}

exports.sendResponse = (req, res, statusCode, data) => {
    if(req.headers.accept == 'application/xml'){
        this.sendXmlResponse(req, res, statusCode, data);
    }
    else if(req.headers.accept == 'text/html'){
        this.sendHtmlResponse(req, res, statusCode, data);
    }
    else if(req.headers.accept == 'text/plain'){
        console.log("plain plain");
        this.sendPlainResponse(req, res, statusCode, data);
    }
    else {
        this.sendJsonResponse(req, res, statusCode, data);
    }
}