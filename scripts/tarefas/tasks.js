onload = () => {
  let nomeUsuario = document.querySelector('.user-info p')
  let endPointLogin = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";

  let tokenJwt = localStorage.getItem("jwt");

  let configRequisicao = {
    method: "GET",
    headers: {
      authorization: tokenJwt,
    },
  };
  fetch(endPointLogin, configRequisicao)
    .then((result) => {
      if (result.status == 200) {
        return result.json();
      }
    })
    .then((result) => {
        nomeUsuario.innerText = `Olá, ${result.firstName}`;
    })
    .catch((erro) => {
        console.log(erro);
    });
};
