import axios from "axios";
import { API_BASE_URL } from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

function auth(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function shortenUrl(token, url, code) {
  return api.post(
    "/shorten",
    { url, code },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function getUserUrls(token) {
  const res = await api.get("/codes", auth(token));
  return res.data.codes;
}

export async function deleteUrl(token, id) {
  return api.delete(`/${id}`, auth(token));
}
