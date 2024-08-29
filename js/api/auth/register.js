import { API_AUTH_REGISTER } from "../constants.js";

export async function register({ name, email, password }) {
  const body = JSON.stringify({ name, email, password })

  const response = await fetch(API_AUTH_REGISTER, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body
  })

  if (response.ok) {
    const { data } = await response.json()
    return data
  }

  throw new Error("Could not register this account")
}