export function currentUser() {
  try {
    return JSON.parse(localStorage.user);
  } catch {
    return null;
  }
}
