export const getTokenFromCookies = () => {
  if (typeof window === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; authToken=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};
