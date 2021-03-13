const USER_KEY = "USER_KEY";

export const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const deleteUser = () => {
  localStorage.removeItem(USER_KEY);
};
