import { currentUser } from "../utilities/currentUser.js"

export default class NoroffAPI {
  apiBase = ""

  constructor(apiBase = "https://v2.api.noroff.dev") {
    this.apiBase = apiBase
  }

  get user() {
    return currentUser();
  }

  get apiLoginPath() {
    return `${this.apiBase}/auth/login`
  }

  get apiRegisterPath() {
    return `${this.apiBase}/auth/register`
  }

  get apiPostPath() {
    return `${this.apiBase}/blog/posts/${this.user.name}`
  }

  auth = {
    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });
  
      const response = await fetch(this.apiLoginPath, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body,
      });
    
      if (response.ok) {
        const { data } = await response.json();
        const { accessToken: token, ...user } = data;
        localStorage.token = token;
        localStorage.user = JSON.stringify(user);
        return data;
      }
    
      throw new Error("Could not login with this account");
    },
    register: async ({ name, email, password }) => {
      const body = JSON.stringify({ name, email, password });
    
      const response = await fetch(this.apiRegisterPath, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body,
      });
    
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
    
      throw new Error("Could not register this account");
    },
    logout: () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/auth/login"
    }
  }

  post = {
    read: async (id) => {
      const user = currentUser();
    
      const response = await fetch(`${this.apiPostPath}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
    
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
    
      throw new Error("Could not fetch post" + id);
    },
    update: async (id, { title, body, tags, media }) => {
      const user = currentUser();
    
      const response = await fetch(`${this.apiPostPath}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        method: "put",
        body: JSON.stringify({ title, body, tags, media }),
      });
    
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
    
      throw new Error("Could not update post " + id);
    },
    delete: async (id) => {
      const user = currentUser();
    
      const response = await fetch(`${this.apiPostPath}/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
    
      if (response.ok) {
        return await response.text();
      }
    
      throw new Error("Could not delete post" + id);
    },
    create: async ({ title, body, tags, media }) => {
      const user = currentUser();
    
      const response = await fetch(this.apiPostPath, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        method: "post",
        body: JSON.stringify({ title, body, tags, media }),
      });
    
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
    
      throw new Error("Could not create post");
    }
  }

  posts = {
    read: async (tag, limit = 12, page = 1) => {    
      const url = new URL(this.apiPostPath);
    
      if (tag) {
        url.searchParams.append("_tag", tag);
      }
    
      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);
    
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
    
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
    
      throw new Error("Could not fetch posts");
    }
  }
}