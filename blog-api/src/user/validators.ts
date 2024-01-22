import { InferType, object, string } from "yup";

//validaciones en común
const email = string()
  .required("El email es requerido")
  .email("El email que proporcionas parece no ser válido");
const password = string()
  .required("La contraseña es requerida")
  .min(7, "La contraseña debe tener al menos 7 carácteres");

//validador de los datos del usuario al crear uno
export const createUserValidator = object({
  name: string().required("El nombre del usuario es requerido"),
  email,
  password,
})
  .noUnknown(
    true,
    "No se permiten propiedades desconocidas en la información del usuario"
  )
  .required("La información del usuario es requerida");
export type CreateUserBody = InferType<typeof createUserValidator>;

//validador para el login del usuario
export const loginUserValidator = object({
  email,
  password,
})
  .noUnknown(
    true,
    "No se permiten propiedades desconocidas en la información del usuario"
  )
  .required("La información del usuario es requerida");
export type LoginUserBody = InferType<typeof loginUserValidator>;
