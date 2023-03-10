"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var port = 4000;
var app = (0, _express["default"])();
app.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});
