export async function getTopRegion(token) {
  const res = await fetch("http://localhost:8000/stats/top-region", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch top region");
  }

  return res.json();
}
