let globalAccessToken = null;

export const setGlobalToken = (token) => {
  globalAccessToken = token;
};

export const getGlobalToken = () => {
  return globalAccessToken;
};

export const clearAccessToken = () => {
    globalAccessToken = null;
  };