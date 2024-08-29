import { readPosts } from "../../api/post/read.js";

export async function onViewPosts() {
  try {
    const posts = await readPosts();

    const list = posts.map((post) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `/post/?id=${post.id}`;
      a.innerText = post.title;
      li.append(a);
      return li;
    });

    document.querySelector("ul").append(...list);
  } catch (error) {
    alert(error);
  }
}
