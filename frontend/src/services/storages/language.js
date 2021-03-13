const LANGUAGE_KEY = "LANGUAGE_KEY";

export const setLanguage = (language) => {
  localStorage.setItem(LANGUAGE_KEY, JSON.stringify(language));
};

export const getLanguage = () => {
  const language = localStorage.getItem(LANGUAGE_KEY);
  return language ? JSON.parse(language) : "en";
};

export const deleteLanguage = () => {
  localStorage.removeItem(LANGUAGE_KEY);
};
