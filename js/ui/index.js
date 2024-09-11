import NoroffAPI from "../api/index.js";

export default class NoroffApp extends NoroffAPI {

  constructor() {
    super()
    this.route()
  }

  async route(href = window.location.href) {
    const url = new URL(href);
    const params = Object.fromEntries(url.searchParams.entries())
    const pathname = url.pathname

    switch (pathname) {
      case "/":
      case "/index.html":
        await this.views.home()
        break;
      case "/auth/register.html":
        await this.views.register()
        break;
      case "/auth/login.html":
        await this.views.login()
        break;
      case "/post/index.html":
      case "/post/":
      case "/post":
        await this.views.post(params.id)
        break;
      case "/post/create.html":
        await this.views.postCreate()
        break;
      case "/post/update.html":
        await this.views.postUpdate(params.id)
        break;
      case "/posts":
      case "/posts/":
      case "/posts/index.html":
        await this.views.posts(params)
        break;
      default:
      // 404 not found
    }
  }

  static form = {
    handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      return Object.fromEntries(formData.entries());
    }
  }

  static tags = {
    split(tagString) {
      let tags = tagString.split(",").map((tag) => tag.trim());
      return tags
    },
    join(tagArray) {
      return tagArray.join(", ")
    }
  }

  views = {
    home: async () => {
      document.querySelectorAll("[data-auth=logout]").forEach(button => {
        button.addEventListener("click", () => {
          this.auth.logout()
        })
      })
    },
    login: async () => {
      document.forms.login.addEventListener("submit", this.events.login);
    },
    register: async () => {
      document.forms.register.addEventListener("submit", this.events.register);
    },
    post: async (id) => {
      const post = await this.post.read(id)
      document.querySelector("input#id").value = id;
      document.querySelector(".title").innerText = post.title;
      document.querySelector(".body").innerText = post.body;
      document.querySelector(".tags").innerText = NoroffApp.tags.join(post.tags);
      document.querySelector("a.update").href += post.id;
      document.forms.deletePost.addEventListener("submit", this.events.post.delete)
    },
    postUpdate: async (id) => {
      try {
        const post = await this.post.read(id);
        document.querySelector("input#id").value = id;
        document.querySelector("#title").value = post.title;
        document.querySelector("#body").value = post.body;
        document.querySelector("#tags").value = post.tags.join(", ");

        document.forms.updatePost.addEventListener("submit", this.events.post.update)
      } catch (error) {
        alert(error);
      }
    },
    postCreate: async () => {
      document.forms.createPost.addEventListener("submit", this.events.post.create)
    },
    posts: async (params) => {
      const posts = await this.posts.read(params.tag, params.limit, params.page);
      const ul = document.querySelector("ul");

      const listItems = posts.map(post => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = post.title;
        a.href = `/post/?id=${post.id}`
        li.append(a)
        return li
      })

      ul.append(...listItems)
    }
  }

  events = {
    login: async (event) => {
      const data = NoroffApp.form.handleSubmit(event)

      try {
        await this.auth.login(data)
        window.location.href = "/"
      } catch (error) {
        alert(error);
      }
    },
    register: async (event) => {
      const data = NoroffApp.form.handleSubmit(event)

      try {
        await this.auth.register(data)
      } catch (error) {
        alert(error);
      }
    },
    post: {
      create: async (event) => {
        const data = NoroffApp.form.handleSubmit(event)
        data.tags = NoroffApp.tags.split(data.tags)

        try {
          const post = await this.post.create(data)
          window.location.href = `/post/?id=${post.id}`;
        } catch (error) {
          alert(error);
        }
      },
      update: async (event) => {
        const { id, ...post } = NoroffApp.form.handleSubmit(event)

        post.tags = post.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

        try {
          await this.post.update(id, post);
          window.location.href = `/post/?id=${id}`;
        } catch (error) {
          alert(error);
        }
      },
      delete: async (event) => {
        const { id } = NoroffApp.form.handleSubmit(event)

        try {
          await this.post.delete(id);
          alert(`Post ${id} has been deleted`);
          window.location.href = "/";
        } catch (error) {
          alert(error);
        }
      }
    }
  }
}
