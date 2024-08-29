
import { currentUser } from "../../utilities/currentUser.js";
import { API_BLOG_USER_POST, API_BLOG_USER_POSTS } from "../constants.js";

export async function readPost(id) {
  const user = currentUser()

  const response = await fetch(API_BLOG_USER_POST(user.name, id), {
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  })

  if (response.ok) {
    const { data } = await response.json()
    return data
  }

  throw new Error("Could not fetch post" + id)
}

export async function readPosts(tag, limit = 12, page = 1) {
  const user = currentUser()

  const url = new URL(API_BLOG_USER_POSTS(user.name))

  if (tag) {
    url.searchParams.append("_tag", tag)
  }

  url.searchParams.append("limit", limit)
  url.searchParams.append("page", page)

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  })

  if (response.ok) {
    const { data } = await response.json()
    return data
  }

  throw new Error("Could not fetch posts")
}