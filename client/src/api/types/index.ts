export type UserRequiredPayload = {
  name: string;
  password: string;
}

export type UserPayload = UserRequiredPayload & {
  email: string;
}