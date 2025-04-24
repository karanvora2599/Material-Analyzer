const BASE_URL = "http://127.0.0.1:8000";

export async function analyzeImage(file) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${BASE_URL}/analyze-image`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Server ${res.status}: ${txt}`);
  }
  return res.json();
}