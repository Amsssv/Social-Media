export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)};`;
};

export const getCookie = (name: string) =>
  document.cookie
    .split(";")
    .map((str) => str.split("="))
    .filter(([key]) => key === name)
    .map(([key, value]) => decodeURIComponent(value.trim()))[0] || null;

export const removeCookie = (name: string) =>
  document.cookie
    .split(";")
    .map((str) => str.split("="))
    .filter(([key, value]) => key === name)
    .join(";");
