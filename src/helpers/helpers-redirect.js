export const redirectToPage = (idTimeout, url, navigate, time) => {
  idTimeout.current = setTimeout(() => {
    navigate(`${url}`);
  }, time);
};
