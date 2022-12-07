const login = document.querySelector("#login-btn");

login.addEventListener("click", (e) => {
  e.preventDefault();

  let form = document.querySelector("#login-form");

  const email = form.email.value;
  const password = form.password.value;


  const options = {
    method: "POST",
    url: "https://sgi-prototype-api.vercel.app/user/login",
    headers: { "Content-Type": "application/json" },
    data: {
      email: email,
      password: password,
    },
  };

  window.axios
    .request(options)
    .then((response) => {
      // if (response.data.token == undefined) {
      //   throw "Usuário não encontrado";
      // }
      window.Cookies.set("userData", JSON.stringify(response.data));
      window.location.assign("../index.html");
    })
    .catch((error) => {
      // handle error
      console.error(error);
      alert("Erro na autenticação");
    });
});
