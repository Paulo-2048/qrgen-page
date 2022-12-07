let isLogin = false;

try {
  let userDataToken = JSON.parse(window.Cookies.get("userData")).token;
  isLogin = true;
} catch (error) {
  if (location.pathname != "/pages/login.html" && location.pathname != "/pages/register.html")
    window.location.replace("/pages/login.html");
}

const loginButton = document.getElementById("btnLogin");
const registerButton = document.getElementById("btnRegister");
const logoutButton = document.getElementById("btnLogout");

if (isLogin) {
  loginButton.classList.add("d-none");
  registerButton.classList.add("d-none");
  logoutButton.classList.remove("d-none");
}

logoutButton.addEventListener("click", () => {
  isLogin = false;
  window.Cookies.remove("userData");
  window.location.replace("/pages/login.html");
});
