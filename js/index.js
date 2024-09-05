import { onCreatePost } from "./ui/post/createPost.js";
import { onLogin } from "./ui/auth/login.js";
import { onRegister } from "./ui/auth/register.js";
import { onViewPost } from "./ui/post/viewPost.js";
import { currentPostId } from "./utilities/currentPostId.js";
import { onUpdatePost } from "./ui/post/updatePost.js";
import { onViewPosts } from "./ui/post/viewPosts.js";
import NoroffAPI from "./api/index.js";

const api = new NoroffAPI();

const postId = currentPostId();


document.querySelectorAll("[data-auth=logout]").forEach(button => {
  button.addEventListener("click", event => {
    api.auth.logout()
  })
})


switch (window.location.pathname) {
  case "/":
  case "/index.html":
    // home page
    break;
  case "/auth/register.html":
    document.forms.register.addEventListener("submit", onRegister);
    break;
  case "/auth/login.html":
    document.forms.login.addEventListener("submit", onLogin);
    break;
  case "/post/index.html":
  case "/post/":
  case "/post":
    await onViewPost(postId);
    break;
  case "/post/create.html":
    document.forms.createPost.addEventListener("submit", onCreatePost);
    break;
  case "/post/update.html":
    onUpdatePost();
    break;
  case "/posts":
  case "/posts/":
  case "/posts/index.html":
    onViewPosts();
    break;
  default:
  // 404 not found
}
