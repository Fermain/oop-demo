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
        headers: this.util.setupHeaders(true),
        method: "post",
        body,
      });

      const { data } = await this.util.handleResponse(response)
      const { accessToken: token, ...user } = data;
      localStorage.token = token;
      localStorage.user = JSON.stringify(user);
      return user
    },
    register: async ({ name, email, password }) => {
      const body = JSON.stringify({ name, email, password });

      const response = await fetch(this.apiRegisterPath, {
        headers: this.util.setupHeaders(true),
        method: "post",
        body,
      });

      const { data } = await this.util.handleResponse(response)
      return data
    },
    logout: () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/auth/login"
    }
  }

  util = {
    setupHeaders: (body) => {
      const headers = new Headers()

      if (localStorage.token) {
        headers.append("Authorization", `Bearer ${localStorage.token}`)
      }

      if (body) {
        headers.append("Content-Type", "application/json")
      }

      return headers
    },
    handleResponse: async (response, output = "json") => {
      if (response.ok) {
        return await response[output]()
      } else {
        const result = await response.json()
        const error = result.errors.map(error => error.message).join("\r\n")

        throw new Error(error)
      }
    }
  }

  post = {
    read: async (id) => {
      const response = await fetch(`${this.apiPostPath}/${id}`, {
        headers: this.util.setupHeaders(),
      });

      const { data } = await this.util.handleResponse(response)
      return data
    },
    update: async (id, { title, body, tags, media }) => {
      const response = await fetch(`${this.apiPostPath}/${id}`, {
        headers: this.util.setupHeaders(true),
        method: "put",
        body: JSON.stringify({ title, body, tags, media }),
      });

      const { data } = await this.util.handleResponse(response)
      return data
    },
    delete: async (id) => {
      const response = await fetch(`${this.apiPostPath}/${id}`, {
        method: "delete",
        headers: this.util.setupHeaders(),
      });

      const text = this.util.handleResponse(response, "text")
      return text
    },
    create: async ({ title, body, tags, media }) => {
      const response = await fetch(this.apiPostPath, {
        headers: this.util.setupHeaders(true),
        method: "post",
        body: JSON.stringify({ title, body, tags, media }),
      });

      const { data } = await this.util.handleResponse(response)
      return data
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
        headers: this.util.setupHeaders(),
      });

      const { data } = await this.util.handleResponse(response)
      return data
    }
  }
}