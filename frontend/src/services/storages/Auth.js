const TOKEN_KEY = "TOKEN_KEY";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? JSON.parse(token) : null;
};

export const deleteToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
