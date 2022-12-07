const register = document.querySelector("#register-btn");

register.addEventListener("click", (e) => {
  e.preventDefault();

  let form = document.querySelector("#register-form");

  const email = form.email.value;
  const password = form.password.value;

  const options = {
    method: "POST",
    url: "https://sgi-prototype-api.vercel.app/user",
    headers: { "Content-Type": "application/json" },
    data: {
      name: "trabalho-front-end",
      sector: "front-end",
      cpf: "123.456.789-10",
      email: email,
      password: password,
      acess: "B",
      token: "123qwert",
    },
  };

  window.axios
    .request(options)
    .then((response) => {
      alert("Usuário cadastrado com sucesso");
      window.location.assign("./login.html");
    })
    .catch((error) => {
      // handle error
      console.error(error);
      alert("Erro na autenticação");
    });
});
