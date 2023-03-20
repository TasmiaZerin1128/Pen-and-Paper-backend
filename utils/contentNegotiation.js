const js2xmlparser = require("js2xmlparser");
const json2html = require('node-json2html');

exports.sendJsonResponse = (req, res, statusCode, data) => {
    return res.status(statusCode).json(data);
}

exports.sendXmlResponse = (req, res, statusCode, data) => {
    res.setHeader('content-type', 'application/xml');
    return res.status(statusCode).send(js2xmlparser.parse(data));
}

exports.sendHtmlResponse = (req, res, statusCode, data) => {
    res.setHeader('Content-Type', 'text/html');
    console.log(json2html.render([data]));
    return res.status(statusCode).send(data);
}

exports.sendResponse = (req, res, statusCode, data) => {
    console.log("here");
    if(req.headers.accept == 'application/xml'){
        this.sendXmlResponse(req, res, statusCode, data);
    }
    else if(req.headers.accept == 'text/html'){
        console.log("html");
        this.sendHtmlResponse(res, res, statusCode, data);
    }
    else {
        this.sendJsonResponse(req, res, statusCode, data);
    }
    
}