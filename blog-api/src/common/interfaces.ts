export type BaseResponse<T = any> = {
  error?: string;
  data?: T;
  success: boolean;
};

export type AuthData = { id: string };
