import axios from "axios";

function sendSignUpData(payload: object) {
  axios
    .post("http://localhost:5000/api/signup", {
      ...payload,
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}

export default sendSignUpData;
