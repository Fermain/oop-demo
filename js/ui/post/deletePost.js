import { deletePost } from "../../api/post/delete.js";
import { currentPostId } from "../../utilities/currentPostId.js";

export async function onDeletePost() {
  const id = currentPostId()
  try {
    await deletePost(id)
    alert(`Post ${id} has been deleted`)
    window.location.href = "/"
  } catch(e) {
    console.log(e);
    alert(`Post ${id} could not be deleted`)
  }
}