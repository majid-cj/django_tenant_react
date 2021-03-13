export const formatUser = (data) => {
  const token = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };

  const user = {
    username: data.username,
  };

  return { token: token, user: user };
};
