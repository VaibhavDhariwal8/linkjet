import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

function auth(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function shortenUrl(token, url, code) {
  return api.post("/shorten", { url, code }, auth(token));
}

export async function getUserUrls(token) {
  const res = await api.get("/codes", auth(token));
  return res.data.codes;
}

export async function deleteUrl(token, id) {
  return api.delete(`/${id}`, auth(token));
}
