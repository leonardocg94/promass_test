export type AuthSliceState = {
  isLogged: boolean;
  name: string;
  email: string;
};

export type LoginPayload = {
  name: string;
  email: string;
  token: string;
};

export type GetSessionPayload = {
  name: string;
  email: string;
};
