var port = 8080;
var serverUrl = "127.0.0.1";

var http = require("http");
var path = require("path");
var fs = require("fs");

console.log("Starting web server at " + serverUrl + ":" + port);

http.createServer(function(req, res) {
  var filename = req.url;

  if (!filename || filename === '/') {
    filename = "/index.html";
  }

  var index = filename.indexOf("?");
  if (index !== -1) {
    filename = filename.substring(0, index);
  }

  var ext = path.extname(filename);
  var validExtensions = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".txt": "text/plain",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png",
    ".ico": "image/ico"
  };
  var isValidExt = validExtensions[ext];

  if (isValidExt) {

    if (/^\//g.test(filename)) {
      filename = "." + filename;
    }

    var localPath = path.resolve(__dirname, filename);

    fs.exists(localPath, function(exists) {
      if (exists) {
        console.log("Serving file: " + localPath);
        getFile(localPath, res, ext);
      } else {
        console.log("File not found: " + localPath);
        res.writeHead(404);
        res.end();
      }
    });
  } else {
    console.log("Invalid file extension detected: " + ext)
  }

}).listen(port, serverUrl);

function getFile(localPath, res, mimeType) {
  fs.readFile(localPath, function(err, contents) {
    if (!err) {
      res.setHeader("Content-Length", contents.length);
      res.setHeader("Content-Type", mimeType);
      res.statusCode = 200;
      res.end(contents);
    } else {
      res.writeHead(500);
      res.end();
    }
  });
}