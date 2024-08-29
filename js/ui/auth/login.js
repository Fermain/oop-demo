import { login } from "../../api/auth/login.js";

export async function onLogin(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    await login(data);
  } catch (error) {
    alert(error);
  }
}
