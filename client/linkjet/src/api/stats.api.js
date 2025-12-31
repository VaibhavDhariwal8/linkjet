import axios from "axios";
import { API_BASE_URL } from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export async function getTopRegion(token) {
  const res = await api.get("/stats/top-region", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; // ✅ Axios way
}
