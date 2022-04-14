let logOut = document.getElementById("closeApp");


let tokenJwt = localStorage.getItem("jwt");

logOut.addEventListener("click", (e) => {
  e.preventDefault();

  let finalizarSessao = confirm("Deseja realmente sair da sua sessão?");

  if (finalizarSessao) {
    tokenJwt = localStorage.removeItem("jwt")
    location.href = "index.html";
  } else {
    location.reload()
  }
});
