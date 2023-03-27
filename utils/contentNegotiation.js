const json2xml = require('js2xmlparser');
const json2html = require('json-to-html');
const json2plain = require('json-to-plain-text');

exports.sendJsonResponse = (data) => {
  return jsonData = { data: data };
};

exports.sendXmlResponse = (data) => {
  return json2xml.parse('data', data);
};

exports.sendPlainResponse = (data) => {
  return json2plain.toPlainText(JSON.parse(JSON.stringify(data)));
};

exports.sendHtmlResponse = (data) => {
  return json2html(JSON.parse(JSON.stringify(data)));
};

exports.sendFinalResponse = (res, status, data) => {
  res.status(status).send(data);
};

exports.sendResponse = (req, res, statusCode, data) => {
  switch(req.headers.accept){
    case 'application/xml':
      data = this.sendXmlResponse(data);
      break;
    case 'text/xml':
      data = this.sendXmlResponse(data);
      break;
    case 'text/html':
      data = this.sendHtmlResponse(data);
      break;
    case 'text/plain':
      data = this.sendPlainResponse(data);
      break;
    default:
      data = this.sendJsonResponse(data);
      break;
  }
  return this.sendFinalResponse(res, statusCode, data);
};
