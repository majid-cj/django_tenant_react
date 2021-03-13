const usernameFormat = /^(?!.*\.\.)(?!_*\_\_)(?!\_.)(?!.*\.$)(?![0-9]*[0-9])[\w.]{2,14}$/;

export const validateUsername = (username) => usernameFormat.test(username);
