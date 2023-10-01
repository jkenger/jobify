import axios from "axios";

const fetch = axios.create({
  baseURL: "/api/v1",
  // withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default fetch;
