const useToken = (key) => {
  // get token

  const getToken = () => {    
    return JSON.parse(localStorage.getItem(key));
  };

  const storeToken = (token) => {
    if (hasToken()) {
      deleteToken();
    }

    return localStorage.setItem(key, JSON.stringify(token));
  };

  const hasToken = () => {
    return !!getToken();
  };

  // delete token
  const deleteToken = () => {
    localStorage.removeItem(key);
  };

  return {
    getToken,
    storeToken,
    hasToken,
    deleteToken,
  };
};

export default useToken;
