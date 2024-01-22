"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidator = exports.createUserValidator = void 0;
const yup_1 = require("yup");
//validaciones en común
const email = (0, yup_1.string)()
    .required("El email es requerido")
    .email("El email que proporcionas parece no ser válido");
const password = (0, yup_1.string)()
    .required("La contraseña es requerida")
    .min(7, "La contraseña debe tener al menos 7 carácteres");
//validador de los datos del usuario al crear uno
exports.createUserValidator = (0, yup_1.object)({
    name: (0, yup_1.string)().required("El nombre del usuario es requerido"),
    email,
    password,
})
    .noUnknown(true, "No se permiten propiedades desconocidas en la información del usuario")
    .required("La información del usuario es requerida");
//validador para el login del usuario
exports.loginUserValidator = (0, yup_1.object)({
    email,
    password,
})
    .noUnknown(true, "No se permiten propiedades desconocidas en la información del usuario")
    .required("La información del usuario es requerida");
