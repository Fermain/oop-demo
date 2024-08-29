import { readPost } from "../../api/post/read.js";
import { onDeletePost } from "./deletePost.js";

export async function onViewPost(id) {
  try {
    const post = await readPost(id);

    document.querySelector(".title").innerText = post.title;
    document.querySelector(".body").innerText = post.body;
    document.querySelector(".tags").innerText = post.tags.join(", ");
    document.querySelector("a.update").href += post.id;
    document
      .querySelector("button.delete")
      .addEventListener("click", onDeletePost);
  } catch (error) {
    alert(error);
    window.location.href = "/";
  }
}
