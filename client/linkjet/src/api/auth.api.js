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

export async function getMe(token) {
  const res = await api.get("/user/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getUserUrls(token) {
  const res = await api.get("/codes", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.codes;
}
