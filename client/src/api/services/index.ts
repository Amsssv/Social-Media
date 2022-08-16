import axios from "axios";
import { AxiosResponse } from "axios";
import { UserPayload, UserRequiredPayload } from "../types";

export async function signUp(payload: UserPayload) {
  try {
    const response: AxiosResponse = await axios.post("api/signup", payload);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function signIn(payload: UserRequiredPayload) {
  try {
    const response: AxiosResponse = await axios.post("api/login", payload);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function signOut(payload: object) {
  try {
    const result: AxiosResponse = await axios.post("api/login", {
      ...payload,
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
