import axios from "axios";

export async function signUp(payload: object) {
  try {
    return await axios.post("api/signup", {
      ...payload,
    });
  } catch (e) {
    throw e.response.data;
  }
}

export async function logIn(payload: object) {
  try {
    let result = await axios.post("api/login", {
      ...payload,
    });
    localStorage.setItem("token", result.data.accessToken);
  } catch (e) {
    throw e.response.data;
  }
}
