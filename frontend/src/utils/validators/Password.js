const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

export const validatePassword = (password) => passwordFormat.test(password);

export const matchPassword = (password, confirm_password) =>
  password === confirm_password;
