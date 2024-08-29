import api from "../../api/instance.js"
import { suggestTags } from "../../utilities/suggestTags.js";

export async function onCreatePost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  data.tags = data.tags.split(",").map((tag) => tag.trim());
  data.tags = [...data.tags, ...suggestTags(data.title)].filter(Boolean);

  try {
    const post = await api.post.create(data)
    window.location.href = `/post/?id=${post.id}`;
  } catch (error) {
    alert(error);
  }
}
