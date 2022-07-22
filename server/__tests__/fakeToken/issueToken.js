"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function issueToken(data, options) {
    return jsonwebtoken_1.default.sign(data, 'test', options);
}
exports.default = issueToken;
//# sourceMappingURL=issueToken.js.map