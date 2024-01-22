export type SingInUserBody = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserBody = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  userData: {
    name: string;
    email: string;
    token: string;
  };
};

export type GetUserSessionResponse = {
  user: {
    name: string;
    email: string;
  };
};
