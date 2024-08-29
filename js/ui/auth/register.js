import { register } from "../../api/auth/register.js";

export async function onRegister(event) {
  event.preventDefault();
  const form = event.target
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())
  
  try {
    await register(data)
  } catch (error) {
    alert(error)
  }
}