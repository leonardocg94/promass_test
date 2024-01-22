import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../../features/User/store";

export const Header = () => {
  const { isLogged, name } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <>
      <nav className="py-4 flex justify-between items-center flex-wrap">
        <Link to={"/"}>
          <h1 className="text font-light md:text-6xl text-3xl">Blog App</h1>
        </Link>
        <div className="flex gap-3 items-center">
          {!isLogged ? (
            <Link
              to={"/login"}
              className="bg-transparent text-blue-600 border-blue-600 border-2 rounded-sm p-2 md:text-xl text-sm font-semibold"
            >
              Iniciar Sesión
            </Link>
          ) : (
            <>
              <span className="text-blue-600 md:text-xl text-sm font-semibold" >{name}</span>
              <button
                className="bg-transparent text-blue-600 border-blue-600 border-2 rounded-sm p-2 md:text-xl text-sm font-semibold min-w-[100px]"
                onClick={() => dispatch(logout())}
              >
                Salir
              </button>
            </>
          )}
        </div>
      </nav>
      <span className="w-[60%] bg-blue-600 h-1 block mb-4">&nbsp;</span>
    </>
  );
};
