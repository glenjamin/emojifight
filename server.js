var path = require('path');
var http = require('http');
var express = require('express');

var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);

app = express();

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

var server = http.createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
