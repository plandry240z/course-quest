import { auth } from "./firebase";

const BASE_URL = "http://127.0.0.1:8080";

export async function createProfile(profile) {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");

  const idToken = await user.getIdToken();

  const res = await fetch(`${BASE_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // matches your server: req.headers.authorization
      Authorization: idToken,
    },
    body: JSON.stringify(profile),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed with status ${res.status}`);
  }

  return data;
}