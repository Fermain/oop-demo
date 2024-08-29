import { createPost } from "../../api/post/create.js";

export async function onCreatePost(event) {
  event.preventDefault();
  const form = event.target
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  data.tags = data.tags.split(",").map(tag => tag.trim())

  try {
    const post = await createPost(data)
    window.location.href = `/post/?id=${post.id}`
  } catch(error) {
    alert(error)
  }
}