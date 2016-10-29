/* eslint-env browser */

if (window.location.search.match(/hot/)) {
  require('webpack-hot-middleware/client');
}

var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./App');

require('./page.css');
window.app = ReactDOM.render(
  <App />,
  document.getElementById('root')
);
