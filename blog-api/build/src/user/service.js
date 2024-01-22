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
exports.getUserSessionService = exports.loginUserService = exports.createUserService = void 0;
const model_1 = require("./model");
const utils_1 = require("./utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//servicio para crear un usuario
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = user;
    yield (0, utils_1.validateIfEmailUserIsAlreadyInUse)(email);
    const hash = bcrypt_1.default.hashSync(password, 10);
    user.password = hash;
    const createdUser = yield model_1.DaoUser.create(user);
    if (!createdUser)
        throw new Error("Ocurrió un error al crear el usuario " + user.name);
    return createdUser;
});
exports.createUserService = createUserService;
//servicio para login de usuario
const loginUserService = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield model_1.DaoUser.findOne({ where: { email } });
    if (!foundUser)
        throw new Error("No hay un usuario registrado con este email");
    const validPassword = bcrypt_1.default.compareSync(password, foundUser.getDataValue("password"));
    if (!validPassword)
        throw new Error("La contraseña es incorrecta");
    const token = jsonwebtoken_1.default.sign({ id: foundUser.dataValues.id }, process.env.JWT_SECRET_WORD);
    return {
        name: foundUser.dataValues.name,
        email: foundUser.dataValues.email,
        token,
    };
});
exports.loginUserService = loginUserService;
//servicio para obtener la sesion por id de un usuario
const getUserSessionService = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.DaoUser.findByPk(user_id, {
        attributes: ["name", "email"],
    });
    if (!user)
        throw new Error("Usuario no encontrado");
    return user;
});
exports.getUserSessionService = getUserSessionService;
