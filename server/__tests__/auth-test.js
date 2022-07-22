"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var issueToken_1 = __importDefault(require("./fakeToken/issueToken"));
var user_data_1 = require("./data/user_data");
var token_data_1 = require("./data/token_data");
describe('Authentication and Authorization form', function () {
    test('User can successfully login', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, _a, status, body, header;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                        .post('/api/login')
                        .send({
                        login: user_data_1.users[0].login,
                        password: user_data_1.users[0].password,
                    })];
                case 1:
                    res = _b.sent();
                    expect(res.status).toBe(200);
                    expect(typeof res.body.accessToken === 'string').toBe(true);
                    expect(typeof res.body.refreshToken === 'string').toBe(true);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .get('/api/refresh')
                            .send({
                            refreshToken: res.body.refreshToken,
                        })];
                case 2:
                    _a = _b.sent(), status = _a.status, body = _a.body, header = _a.header;
                    expect(status).toBe(200);
                    expect(typeof body.accesstoken === 'string').toBe(true);
                    expect(typeof header.cookie.value === 'string').toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    test('User gets 403 on invalid credentials', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                        .post('/api/login')
                        .send({
                        login: 'INVALID',
                        password: 'INVALID',
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
    test('User receives 401 on expired token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expiredToken, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expiredToken = (0, issueToken_1.default)(user_data_1.users[0].id, { expiresIn: '1000ms' });
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .get('/api/users')
                            .set('Authorization', "Bearer ".concat(expiredToken))];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    test('User can get new access token using refresh token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, status, body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                        .post('/api/refresh')
                        .send({
                        refreshToken: token_data_1.tokens[0].token,
                    })];
                case 1:
                    _a = _b.sent(), status = _a.status, body = _a.body;
                    expect(status).toBe(200);
                    expect(typeof body.accessToken === 'string').toBe(true);
                    expect(typeof body.refreshToken === 'string').toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    test('User get 404 on invalid refresh token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                        .post('/api/refresh')
                        .send({
                        refreshToken: 'INVALID',
                    })];
                case 1:
                    status = (_a.sent()).status;
                    expect(status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    test('User can use refresh token only once', function () { return __awaiter(void 0, void 0, void 0, function () {
        var firstResponse, secondResponce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                        .post('/api/refresh')
                        .send({
                        refreshToken: token_data_1.tokens[1].token,
                    })];
                case 1:
                    firstResponse = _a.sent();
                    expect(firstResponse.status).toBe(200);
                    expect(typeof firstResponse.body.accessToken === 'string').toBe(true);
                    expect(typeof firstResponse.body.refreshToken === 'string').toBe(true);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post('/api/refresh')
                            .send({
                            refreshToken: token_data_1.tokens[1].token,
                        })];
                case 2:
                    secondResponce = _a.sent();
                    expect(secondResponce.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Refresh tokens become invalid on logout', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logoutRes, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                        .post('/api/logout')
                        .set('Authorization', "Bearer ".concat((0, issueToken_1.default)(user_data_1.users[1].id, {})))];
                case 1:
                    logoutRes = _a.sent();
                    expect(logoutRes.status).toBe(200);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post('/api/refresh')
                            .send({
                            refreshToken: token_data_1.tokens[2].token,
                        })];
                case 2:
                    status = (_a.sent()).status;
                    expect(status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=auth-test.js.map