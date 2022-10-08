type session = {
  user: string;
};

let currentUser: session = {
  user: "none",
};

export function setCurrentUser(userName: string) {
  currentUser = { user: userName };
}

export function getCurrentUser() {
  return currentUser.user;
}
