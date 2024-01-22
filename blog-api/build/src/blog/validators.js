"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBlogEntryParamsValidator = exports.SEARCH_PARAMETERS = exports.createBlogEntryValidator = void 0;
const yup_1 = require("yup");
//validador del cuerpo al crear una publicación
exports.createBlogEntryValidator = (0, yup_1.object)({
    title: (0, yup_1.string)().required("El título de la publicación es requerido"),
    content: (0, yup_1.string)().required("El contenido de la publicación es requerido"),
})
    .noUnknown(true, "No se permiten propiedades desconocidas en la información de la publicación")
    .required("La información de la publicación es requerida");
//validador para parametros de busqueda
exports.SEARCH_PARAMETERS = ["title", "content", "author"];
exports.searchBlogEntryParamsValidator = (0, yup_1.object)({
    searchCriteria: (0, yup_1.string)()
        .oneOf(exports.SEARCH_PARAMETERS, "Parametro de búsqueda no válido")
        .required("El parametro de busqueda es requerido"),
    searchValue: (0, yup_1.string)().required("El valor de la búsqueda es requerido"),
})
    .noUnknown(true, "No se permiten propiedades desconocidas en la información de búsqueda")
    .required("La información de la búsqueda es requerida");
