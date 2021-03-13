const nameFormat = /^[^-\s][a-zA-Z_\s-]+$/;

export const validateName = (name) => nameFormat.test(name);
