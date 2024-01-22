import { DaoUser } from "./model";

//valida si el email del registro ya existe en la base de datosS
export const validateIfEmailUserIsAlreadyInUse = async (email: string) => {
  const user = await DaoUser.findOne({ where: { email } });
  if (user)
    throw new Error(
      "El email que proporcionaste ya esta siendo usado por otra cuenta"
    );
};
