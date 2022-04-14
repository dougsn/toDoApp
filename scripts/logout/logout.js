let logOut = document.getElementById("closeApp");

logOut.addEventListener("click", (e) => {
  e.preventDefault();
  let tokenJwt = localStorage.removeItem("jwt");

  let finalizarSessao = confirm("Deseja realmente sair da sua sessão?");

  if (finalizarSessao) {
    tokenJwt;
    location.href = "index.html";
  } else {
  }
});
