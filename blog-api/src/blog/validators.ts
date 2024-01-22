import { InferType, object, string } from "yup";

//validador del cuerpo al crear una publicación
export const createBlogEntryValidator = object({
  title: string().required("El título de la publicación es requerido"),
  content: string().required("El contenido de la publicación es requerido"),
})
  .noUnknown(
    true,
    "No se permiten propiedades desconocidas en la información de la publicación"
  )
  .required("La información de la publicación es requerida");
export type CreateBlogEntryBody = InferType<typeof createBlogEntryValidator>;

//validador para parametros de busqueda
export const SEARCH_PARAMETERS = ["title", "content", "author"] as const;
export type SearchParameters = (typeof SEARCH_PARAMETERS)[number];

export const searchBlogEntryParamsValidator = object({
  searchCriteria: string()
    .oneOf(SEARCH_PARAMETERS, "Parametro de búsqueda no válido")
    .required("El parametro de busqueda es requerido"),
  searchValue: string().required("El valor de la búsqueda es requerido"),
})
  .noUnknown(
    true,
    "No se permiten propiedades desconocidas en la información de búsqueda"
  )
  .required("La información de la búsqueda es requerida");
export type SearchBlogEntryParams = InferType<
  typeof searchBlogEntryParamsValidator
>;
