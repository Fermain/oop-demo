import { currentUser } from "../../utilities/currentUser.js";
import { API_BLOG_USER_POSTS } from "../constants.js";

export async function createPost({ title, body, tags, media }) {
  const user = currentUser();

  const response = await fetch(API_BLOG_USER_POSTS(user.name), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    method: "post",
    body: JSON.stringify({ title, body, tags, media }),
  });

  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  throw new Error("Could not create post");
}
