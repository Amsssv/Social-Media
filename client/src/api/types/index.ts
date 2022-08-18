export type UserRequiredPayload = {
  email: string;
  password: string;
};

export type UserPayload = UserRequiredPayload & {
  name: string;
};
