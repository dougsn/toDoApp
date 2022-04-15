let apagarTarefa = document.getElementById("apagarTarefa");


// let tokenJwt = localStorage.getItem("jwt");

apagarTarefa.addEventListener("click", (e) => {
  e.preventDefault();

  Swal.fire({
    icon: 'question',
    title: 'Você tem certeza que quer excluir a tarefa?',
    showDenyButton: true,
    confirmButtonText: 'Sim',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'warning',
        title: 'Tarefa excluida!',
        showConfirmButton: false,
        timer: 1000
      })
      setTimeout(() => {
        // tokenJwt = localStorage.removeItem("jwt")
        location.href = "index.html";
      }, 1100)

    } else if (result.isDenied) {
      Swal.fire({
        icon: 'success',
        title: 'Tarefa mantida!',
        showConfirmButton: false,
        timer: 1000
      })
      // location.reload()
    }
  })
});
