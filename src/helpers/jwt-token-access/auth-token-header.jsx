export default async function authHeader() {
  try {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj && obj.access_token) {
      let token = "Bearer" + " " + obj.access_token;
      return token
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function authToken() {
  try {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj && obj.access_token) {
      let token = obj.access_token;
      return token
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}
export const getAuthObject = async () => {
  try {
    const obj = await JSON.parse(localStorage.getItem("authUser"))
    return obj;
  } catch (err) {
    return null;
  }
}
export const setAuthUser = async (response) => {
  localStorage.setItem("authUser", JSON.stringify(response));
}
