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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenIfExistMiddleware = exports.checkTokenMiddleware = exports.errorHandlerMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//middleware que maneja errores comunes
const errorHandlerMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ err: req.err });
    const error = req.err;
    return res.status(400).json({
        success: false,
        error: error === null || error === void 0 ? void 0 : error.message,
    });
});
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//middleware que revisa que el token fue enviado
const checkTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("auth-token");
        // console.log({ token });
        if (!token)
            return res
                .status(401)
                .json({ success: false, error: "No hay token de sesión" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_WORD);
        // console.log({ decoded });
        if (!decoded)
            return res
                .status(401)
                .json({ success: false, error: "Token de sesión incorrecto" });
        req.authData = decoded;
        next();
    }
    catch (error) {
        const err = error;
        return res.status(401).json({ success: false, error: err.message });
    }
});
exports.checkTokenMiddleware = checkTokenMiddleware;
const getTokenIfExistMiddleware = (req, res, next) => {
    const token = req.header("auth-token");
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_WORD);
        if (decoded)
            req.authData = decoded;
    }
    next();
};
exports.getTokenIfExistMiddleware = getTokenIfExistMiddleware;
