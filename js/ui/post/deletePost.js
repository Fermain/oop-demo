import api from "../../api/instance.js"
import { currentPostId } from "../../utilities/currentPostId.js";

export async function onDeletePost() {
  const id = currentPostId();
  try {
    await api.post.delete(id);
    alert(`Post ${id} has been deleted`);
    window.location.href = "/";
  } catch (e) {
    console.log(e);
    alert(`Post ${id} could not be deleted`);
  }
}
