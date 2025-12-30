import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export async function login(email, password) {
  const res = await api.post("/user/login", { email, password });
  return res.data.token;
}

export async function signup(payload) {
  return api.post("/user/signup", payload);
}
