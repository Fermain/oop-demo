import api from "../../api/instance.js"
import { currentPostId } from "../../utilities/currentPostId.js";

export async function onUpdatePost(event) {
  const id = currentPostId();

  try {
    const post = await api.post.read(id);

    document.querySelector("#title").value = post.title;
    document.querySelector("#body").value = post.body;
    document.querySelector("#tags").value = post.tags.join(", ");

    document.forms.updatePost.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      data.tags = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      try {
        await api.post.update(id, data);
        window.location.href = `/post/?id=${id}`;
      } catch (error) {
        alert(error);
      }
    });
  } catch (error) {
    alert(error);
  }
}
