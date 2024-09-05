import { currentPostId } from "./utilities/currentPostId.js";
import { onViewPosts } from "./ui/post/viewPosts.js";

import NoroffAPI from "./api/index.js";
import NoroffApp from "./ui/index.js";

const api = new NoroffAPI();
const app = new NoroffApp();

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
    document.forms.register.addEventListener("submit", app.events.register);
    break;
  case "/auth/login.html":
    document.forms.login.addEventListener("submit", app.events.login);
    break;
  case "/post/index.html":
  case "/post/":
  case "/post":
    await app.events.post.view(postId)
    break;
  case "/post/create.html":
    document.forms.createPost.addEventListener("submit", app.events.post.create);
    break;
  case "/post/update.html":
    app.events.post.update()
    break;
  case "/posts":
  case "/posts/":
  case "/posts/index.html":
    onViewPosts();
    break;
  default:
  // 404 not found
}
