export default class NoroffAPI {
  get user() {
    try {
      return JSON.parse(localStorage.user);
    } catch {
      return null;
    }
  }

  static base = "https://v2.api.noroff.dev"

  static paths = {
    base: "https://v2.api.noroff.dev",
    login: `${NoroffAPI.base}/auth/login`,
    register: `${NoroffAPI.base}/auth/register`,
    posts: (name) => `${NoroffAPI.base}/blog/posts/${name}`,
    post: (name, id) => `${NoroffAPI.base}/blog/posts/${name}/${id}`
  }

  static util = {
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
    },
    handleRequest: async (url, options = { body: null }, output = "json") => {
      const response = await fetch(url, {
        ...options,
        headers: NoroffAPI.util.setupHeaders(options.body)
      });

      return NoroffAPI.util.handleResponse(response, output)
    }
  }

  auth = {
    /**
     * Logs in the user.
     * @param {Object} user - The login parameters.
     * @param {string} user.email - The user's email.
     * @param {string} user.password - The user's password.
     * @returns {Promise<Object>} The logged-in user data.
     */
    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });

      const response = await fetch(NoroffAPI.paths.login, {
        headers: NoroffAPI.util.setupHeaders(true),
        method: "post",
        body,
      });

      const { data } = await NoroffAPI.util.handleResponse(response)
      const { accessToken: token, ...user } = data;
      localStorage.token = token;
      localStorage.user = JSON.stringify(user);
      return user
    },
    register: async ({ name, email, password }) => {
      const body = JSON.stringify({ name, email, password });

      const response = await fetch(NoroffAPI.paths.register, {
        headers: NoroffAPI.util.setupHeaders(true),
        method: "post",
        body,
      });

      const { data } = await NoroffAPI.util.handleResponse(response)
      return data
    },
    logout: () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/auth/login"
    }
  }

  post = {
    read: async (id) => {
      const { data } = await NoroffAPI.util.handleRequest(NoroffAPI.paths.post(this.user.name, id))
      return data
    },
    update: async (id, { title, body, tags, media }) => {
      const { data } = await NoroffAPI.util.handleRequest(NoroffAPI.paths.post(this.user.name, id), {
        method: "put",
        body: JSON.stringify({ title, body, tags, media })
      })
      return data
    },
    delete: async (id) => {
      await NoroffAPI.util.handleRequest(NoroffAPI.paths.post(this.user.name, id), "text")
    },
    create: async ({ title, body, tags, media }) => {
      const { data } = await NoroffAPI.util.handleRequest(NoroffAPI.paths.posts(this.user.name), {
        method: "post",
        body: JSON.stringify({ title, body, tags, media })
      })
      return data
    }
  }

  posts = {
    read: async (tag, limit = 12, page = 1) => {
      const url = new URL(NoroffAPI.paths.posts(this.user.name));

      if (tag) {
        url.searchParams.append("_tag", tag);
      }

      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);

      const response = await fetch(url, {
        headers: NoroffAPI.util.setupHeaders(),
      });

      const { data } = await NoroffAPI.util.handleResponse(response)
      return data
    }
  }
}