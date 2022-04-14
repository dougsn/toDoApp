let ulTarefaTerminada = document.querySelector(".tarefas-terminadas");

function getId(id) {
  let tokenJwt = localStorage.getItem("jwt");

  let endPointUpdateTask = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;

  let bodyUpdateTask = {
    completed: true,
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

      window.location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
}

function renderizaTarefasTerminadas(tarefa) {
  let liTarefaFinalizada = document.createElement("li");
  liTarefaFinalizada.classList.add("tarefa");

  liTarefaFinalizada.innerHTML = `
    <div class="done"></div>
    <div class="descricao">
    <p class="nome">${tarefa.description}</p>
    <div>
        <button onclick = "returnTask(${tarefa.id})"><i class="fas fa-undo-alt change"></i></button>
        <button onclick = "deleteTask(${tarefa.id})"><i class="far fa-trash-alt"></i></button>
    </div>
    </div>
  
          `;

  ulTarefaTerminada.appendChild(liTarefaFinalizada);
}
