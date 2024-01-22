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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSessionController = exports.loginUserController = exports.createUserController = void 0;
const validators_1 = require("./validators");
const service_1 = require("./service");
//controlador para el servicio de crear usuario
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield validators_1.createUserValidator.validate(req.body);
        const createdUser = yield (0, service_1.createUserService)(body);
        return res.status(201).json({
            success: true,
            data: "",
        });
    }
    catch (error) {
        req.err = error;
        next();
    }
});
exports.createUserController = createUserController;
//controlador para el servicio de login de usuario
const loginUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield validators_1.loginUserValidator.validate(req.body);
        const userData = yield (0, service_1.loginUserService)(body);
        return res.json({ success: true, data: { userData } });
    }
    catch (error) {
        req.err = error;
        next();
    }
});
exports.loginUserController = loginUserController;
//controlador para obtener la sesion de un usuario
const getUserSessionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, service_1.getUserSessionService)(req.authData.id);
        return res.json({ success: true, data: { user } });
    }
    catch (error) {
        req.err = error;
        next();
    }
});
exports.getUserSessionController = getUserSessionController;
