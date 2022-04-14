let logOut = document.getElementById("closeApp");


let tokenJwt = localStorage.getItem("jwt");

logOut.addEventListener("click", (e) => {
  e.preventDefault();

  Swal.fire({
    icon: 'question',
    title: 'Você tem certeza que quer encerrar a sessão?',
    showDenyButton: true,
    confirmButtonText: 'Sim',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire({
          icon: 'warning',
          title: 'Sessão encerrada !',
          showConfirmButton: false,
          timer: 1000
        })
        setTimeout(() => {
          tokenJwt = localStorage.removeItem("jwt")
          location.href = "index.html";
        }, 1100)
      
    } else if (result.isDenied) {
      Swal.fire({
          icon: 'success',
          title: 'Sessão mantida !',
          showConfirmButton: false,
          timer: 1000
        })
      // location.reload()
    }
  })

  // Swal.fire({
  //   icon: 'success',
  //   title: 'Usuário logado com sucesso !',
  //   showConfirmButton: false,
  //   timer: 1900
  // })

  // if (finalizarSessao) {
  //   tokenJwt = localStorage.removeItem("jwt")
  //   location.href = "index.html";
  // } else {
  //   location.reload()
  // }
});
