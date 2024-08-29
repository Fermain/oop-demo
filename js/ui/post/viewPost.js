import api from "../../api/instance.js"
import { onDeletePost } from "./deletePost.js";

export async function onViewPost(id) {
  try {
    const post = await api.post.read(id);

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
