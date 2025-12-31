export function getCountry(req) {
  return (
    req.headers["cf-ipcountry"] ||
    req.headers["x-vercel-ip-country"] ||
    req.headers["x-country-code"] ||
    "Unknown"
  );
}
