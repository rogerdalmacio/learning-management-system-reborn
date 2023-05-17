export const LogoutHandler = async (token) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/logout`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (response.ok) {
    localStorage.clear();

    window.location.reload();
  } else {
    console.log(response);
  }

  // localStorage.clear();
  // window.location.reload();
};
