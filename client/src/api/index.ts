import axios from "axios";
import { AxiosResponse } from "axios";

export async function signUp(payload: object) {
  try {
    return await axios.post("api/signup", {
      ...payload,
    });
  } catch (e) {
    alert(e.response.data);
  }
}

export async function logIn(payload: object) {
  try {
    const result: AxiosResponse = await axios.post("api/login", {
      ...payload,
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
