const fetchUserFromLocalStorage = () => {
  // fetching user details from localstorage
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear()

  return userInfo
}

export default fetchUserFromLocalStorage
