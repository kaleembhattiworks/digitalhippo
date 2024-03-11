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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.paymentRouter = void 0;
var zod_1 = require("zod");
var trpc_1 = require("./trpc");
var server_1 = require("@trpc/server");
var get_payload_1 = require("../get-payload");
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var resend_1 = require("resend");
var ReceiptEmail_1 = require("../components/emails/ReceiptEmail");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env'),
});
var resend = new resend_1.Resend(process.env.RESEND_API_KEY);
exports.paymentRouter = (0, trpc_1.router)({
    createSession: trpc_1.privateProcedure
        .input(zod_1.z.object({ productIds: zod_1.z.array(zod_1.z.string()) }))
        .mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var user, productIds, payload, products, order;
        var input = _b.input, ctx = _b.ctx;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = ctx.user;
                    productIds = input.productIds;
                    if (productIds.length === 0) {
                        throw new server_1.TRPCError({ code: 'BAD_REQUEST' });
                    }
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.find({
                            collection: 'products',
                            where: {
                                id: {
                                    in: productIds,
                                },
                            },
                        })];
                case 2:
                    products = (_c.sent()).docs;
                    return [4 /*yield*/, payload.create({
                            collection: 'orders',
                            data: {
                                _isPaid: false,
                                products: products.map(function (prod) { return prod.id; }),
                                user: user.id,
                            },
                        })];
                case 3:
                    order = _c.sent();
                    try {
                        return [2 /*return*/, { url: "/checkout/".concat(order.id) }];
                    }
                    catch (err) {
                        return [2 /*return*/, { url: null }];
                    }
                    return [2 /*return*/];
            }
        });
    }); }),
    pollOrderStatus: trpc_1.privateProcedure
        .input(zod_1.z.object({ orderId: zod_1.z.string() }))
        .query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var orderId, payload, orders, order;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    orderId = input.orderId;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.find({
                            collection: 'orders',
                            where: {
                                id: {
                                    equals: orderId,
                                },
                            },
                        })];
                case 2:
                    orders = (_c.sent()).docs;
                    if (!orders.length) {
                        throw new server_1.TRPCError({ code: 'NOT_FOUND' });
                    }
                    order = orders[0];
                    return [2 /*return*/, { isPaid: order._isPaid }];
            }
        });
    }); }),
    resolvePayment: trpc_1.privateProcedure
        .input(zod_1.z.object({ orderId: zod_1.z.string(), userId: zod_1.z.string() }))
        .query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var orderId, userId, payload, users, user, orders, order, data, error_1;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    orderId = input.orderId, userId = input.userId;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.find({
                            collection: 'users',
                            where: {
                                id: {
                                    equals: userId,
                                },
                            },
                        })];
                case 2:
                    users = (_c.sent()).docs;
                    user = users[0];
                    if (!user)
                        throw new server_1.TRPCError({ code: 'NOT_FOUND' });
                    return [4 /*yield*/, payload.update({
                            collection: 'orders',
                            data: {
                                _isPaid: true,
                            },
                            where: {
                                id: {
                                    equals: orderId,
                                },
                            },
                        })];
                case 3:
                    orders = (_c.sent()).docs;
                    order = orders[0];
                    if (!order)
                        throw new server_1.TRPCError({ code: 'NOT_FOUND' });
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, resend.emails.send({
                            from: process.env.RESEND_DOMAIN,
                            to: [user.email],
                            subject: 'Thanks for your order! This is your receipt.',
                            html: (0, ReceiptEmail_1.ReceiptEmailHtml)({
                                date: new Date(),
                                email: user.email,
                                orderId: order.id,
                                products: order.products,
                            }),
                        })];
                case 5:
                    data = _c.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _c.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); }),
});
