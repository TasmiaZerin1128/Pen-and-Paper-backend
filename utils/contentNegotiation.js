const js2xmlparser = require("js2xmlparser");
const json2html = require('json2html');

exports.sendJsonResponse = (req, res, statusCode, data) => {
    return res.status(statusCode).json(data);
}

exports.sendXmlResponse = (req, res, statusCode, data) => {
    res.setHeader('Content-Type', 'application/xml');
    return res.status(statusCode).send(js2xmlparser.parse(data));
}

exports.sendHtmlResponse = (req, res, statusCode, data) => {
    res.setHeader('Content-Type', 'text/html');
    let template = {'<>':'div'};
    console.log(json2html.render(data));
    return res.status(statusCode).send(json2html.render(data));
}

exports.sendResponse = (req, res, statusCode, data) => {
    if(req.headers.accept == 'application/xml'){
        this.sendXmlResponse(req, res, statusCode, data);
    }
    else if(req.headers.accept == 'text/html'){
        this.sendHtmlResponse(res, res, statusCode, data);
    }
    else {
        this.sendJsonResponse(req, res, statusCode, data);
    }
    
}