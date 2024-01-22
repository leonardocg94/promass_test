import { AxiosError } from "axios";
import { BaseResponse, axiosInstance } from "../../../common/api";
import {
  GetUserSessionResponse,
  LoginUserBody,
  LoginUserResponse,
  SingInUserBody,
} from "../interfaces";

export const singInUserService = async (data: SingInUserBody) => {
  try {
    const response = await axiosInstance.post<BaseResponse>("user", data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<BaseResponse>;
    return err.response!.data;
  }
};

export const loginUserService = async (data: LoginUserBody) => {
  try {
    const response = await axiosInstance.post<BaseResponse<LoginUserResponse>>(
      "user/login",
      data
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<BaseResponse<LoginUserResponse>>;
    return err.response!.data;
  }
};

export const getUserSessionService = async () => {
  try {
    const token = localStorage.getItem("@auth-token");
    const response = await axiosInstance.get<
      BaseResponse<GetUserSessionResponse>
    >("user", {
      headers: { "auth-token": token },
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<BaseResponse<GetUserSessionResponse>>;
    return err.response!.data;
  }
};
