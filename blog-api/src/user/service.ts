import { DaoUser } from "./model";
import { validateIfEmailUserIsAlreadyInUse } from "./utils";
import { CreateUserBody, LoginUserBody } from "./validators";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//servicio para crear un usuario
export const createUserService = async (user: CreateUserBody) => {
  const { password, email } = user;

  await validateIfEmailUserIsAlreadyInUse(email);

  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;

  const createdUser = await DaoUser.create(user);
  if (!createdUser)
    throw new Error("Ocurrió un error al crear el usuario " + user.name);

  return createdUser;
};

//servicio para login de usuario
export const loginUserService = async ({ email, password }: LoginUserBody) => {
  const foundUser = await DaoUser.findOne({ where: { email } });
  if (!foundUser)
    throw new Error("No hay un usuario registrado con este email");

  const validPassword = bcrypt.compareSync(
    password,
    foundUser.getDataValue("password")
  );
  if (!validPassword) throw new Error("La contraseña es incorrecta");

  const token = jwt.sign(
    { id: foundUser.dataValues.id },
    process.env.JWT_SECRET_WORD as string
  );

  return {
    name: foundUser.dataValues.name,
    email: foundUser.dataValues.email,
    token,
  };
};

//servicio para obtener la sesion por id de un usuario
export const getUserSessionService = async (user_id: string) => {
  const user = await DaoUser.findByPk(user_id, {
    attributes: ["name", "email"],
  });
  if (!user) throw new Error("Usuario no encontrado");

  return user;
};
