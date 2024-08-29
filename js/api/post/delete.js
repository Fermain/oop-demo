import { currentUser } from "../../utilities/currentUser.js";
import { API_BLOG_USER_POST } from "../constants.js";

export async function deletePost(id) {
  const user = currentUser();

  const response = await fetch(API_BLOG_USER_POST(user.name, id), {
    method: "delete",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });

  if (response.ok) {
    return await response.text();
  }

  throw new Error("Could not delete post" + id);
}
