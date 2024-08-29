import { currentUser } from "../../utilities/currentUser.js";
import { API_BLOG_USER_POST } from "../constants.js";

export async function updatePost(id, { title, body, tags, media }) {
  const user = currentUser();

  const response = await fetch(API_BLOG_USER_POST(user.name, id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    method: "put",
    body: JSON.stringify({ title, body, tags, media }),
  });

  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  throw new Error("Could not update post " + id);
}
