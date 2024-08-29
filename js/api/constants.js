export const API_BASE = "https://v2.api.noroff.dev"

export const API_AUTH = `${API_BASE}/auth`

export const API_AUTH_REGISTER = `${API_AUTH}/register`

export const API_AUTH_LOGIN = `${API_AUTH}/login`

export const API_BLOG = `${API_BASE}/blog`

export const API_BLOG_POSTS = `${API_BLOG}/posts`

export const API_BLOG_USER_POSTS = (name) => `${API_BLOG_POSTS}/${name}`

export const API_BLOG_USER_POST = (name, id) => `${API_BLOG_USER_POSTS(name)}/${id}`