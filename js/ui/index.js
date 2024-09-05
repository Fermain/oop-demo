import NoroffAPI from "../api/index.js";

export default class NoroffApp extends NoroffAPI {

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
      tags = [...data.tags, ...suggestTags(data.title)].filter(Boolean);
      return tags
    },
    join(tagArray) {
      return tagArray.join(", ")
    }
  }

  events = {
    login: async (event) => {
      const data = NoroffApp.form.handleSubmit(event)

      try {
        await api.auth.login(data)
        window.location.href = "/"
      } catch (error) {
        alert(error);
      }
    },
    register: async (event) => {
      const data = NoroffApp.form.handleSubmit(event)

      try {
        await api.auth.register(data)
      } catch (error) {
        alert(error);
      }
    },
    post: {
      create: async (event) => {
        const data = NoroffApp.form.handleSubmit(event)
        data.tags = NoroffApp.tags.split(data.tags)

        try {
          const post = await api.post.create(data)
          window.location.href = `/post/?id=${post.id}`;
        } catch (error) {
          alert(error);
        }
      },
      update: async () => {
        const id = currentPostId();

        try {
          const post = await api.post.read(id);

          document.querySelector("#title").value = post.title;
          document.querySelector("#body").value = post.body;
          document.querySelector("#tags").value = post.tags.join(", ");

          document.forms.updatePost.addEventListener("submit", async (event) => {
            const data = NoroffApp.form.handleSubmit(event)

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
      },
      view: async (id) => {
        try {
          const post = await this.post.read(id)
          document.querySelector("input#id").value = id;
          document.querySelector(".title").innerText = post.title;
          document.querySelector(".body").innerText = post.body;
          document.querySelector(".tags").innerText = NoroffApp.tags.join(post.tags);
          document.querySelector("a.update").href += post.id;

          document.forms.deletePost.addEventListener("submit", this.events.post.delete)
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
