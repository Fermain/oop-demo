import api from "../../api/instance.js"

export async function onRegister(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    await api.auth.register(data)
  } catch (error) {
    alert(error);
  }
}
