"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = process.env.PORT || 5000;
app.get('/', function (req, res) {
    res.send('Express + TypeScript Server');
});
app.listen(port, function () { return console.log("App is listening on the http://localhost:5000"); });
exports.default = app;
//# sourceMappingURL=index.js.map