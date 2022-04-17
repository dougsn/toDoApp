function returnTask(event) {
  let tokenJwt = localStorage.getItem("jwt");

  let endPointUpdateTask = `https://ctd-todo-api.herokuapp.com/v1/tasks/${event}`;

  let bodyUpdateTask = {
    completed: false,
    createdAt: dayjs(),
  };

  let updateTaskJson = JSON.stringify(bodyUpdateTask); // Foi convertida para JSON para conseguirmos enviar para o servidor

  let configUpdateTasks = {
    method: "PUT",
    body: updateTaskJson,
    headers: {
      "content-type": "application/json",
      authorization: tokenJwt,
    },
  };

  fetch(endPointUpdateTask, configUpdateTasks)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      Swal.fire({
        icon: 'question',
        title: 'Você quer alterar a tarefa para em andamento ?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'warning',
            title: 'Tarefa alterada para em andamento!',
            showConfirmButton: false,
            timer: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1100)
    
        } else if (result.isDenied) {
          Swal.fire({
            icon: 'success',
            title: 'Tarefa conluida!',
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
    })
    .catch((e) => {
      console.log(e);
    });
}
