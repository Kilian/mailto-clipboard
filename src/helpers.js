export const getBounds = el => el.getBoundingClientRect();
export const getEmail = str =>
  str
    .getAttribute("href")
    .split("mailto:")[1]
    .split("?")[0];
