const USER_ID = "USER_ID";
const TOKEN = "TOKEN";
const ROLE = "ROLE";

export function isLoggedIn() {
  return !!sessionStorage.getItem(USER_ID);
}

export function getLoggedInUserId() {
  return sessionStorage.getItem(USER_ID).replaceAll('"', "");
}

export function setLoggedInUserId(userId) {
  sessionStorage.setItem(USER_ID, userId);
}

export function removeLoggedInUserId() {
  sessionStorage.removeItem(USER_ID);
}

export function getLoggedInUserToken() {
  return sessionStorage.getItem(TOKEN).replaceAll('"', "");
}

export function setLoggedInUserToken(token) {
  sessionStorage.setItem(TOKEN, token);
}

export function removeLoggedInUserToken() {
  sessionStorage.removeItem(TOKEN);
}

export function getLoggedInUserRole() {
  return sessionStorage.getItem(ROLE)?.replaceAll('"', "");
}

export function setLoggedInUserRole(token) {
  sessionStorage.setItem(ROLE, token);
}

export function removeLoggedInUserRole() {
  sessionStorage.removeItem(ROLE);
}
