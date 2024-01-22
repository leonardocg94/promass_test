import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from ".";
import { useEffect, useState } from "react";
import { getUserSessionService } from "../../features/User/api";
import { setUserSession } from "../../features/User/store";

export const useSession = () => {
  const { isLogged } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [firstTime, setIsFirstTime] = useState<boolean>(true);

  useEffect(() => {
    if (!isLogged && pathname === "/createBlogEntry") navigate("/");

    (async () => {
      const res = await getUserSessionService();
      if (res.success) dispatch(setUserSession(res.data!.user));
    })();
  }, []);

  useEffect(() => {
    if (!firstTime) {
      if (isLogged && pathname === "/login") navigate("/");
      if (!isLogged && pathname === "/createBlogEntry") navigate("/");
    }
    setIsFirstTime(false);
  }, [isLogged, pathname]);
};
