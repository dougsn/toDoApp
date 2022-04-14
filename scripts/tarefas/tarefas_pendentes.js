let tarefasPendentesHtml = document.querySelector(".tarefas-pendentes");

function renderizaTarefasPendentes(tarefa) {
  let liTarefaPendente = document.createElement("li");
  liTarefaPendente.classList.add("tarefa");

  liTarefaPendente.innerHTML = `
            <div class="not-done" onclick= getId(${tarefa.id})  id="${tarefa.id}"></div>
            <div class="descricao">
                <p class="nome">${tarefa.description}</p>
                <p class="timestamp"><i class="far fa-calendar-alt"></i> ${tarefa.createdAt}</p>
            </div>

        `;

  tarefasPendentesHtml.appendChild(liTarefaPendente);
}

function getId(id) {
  let tokenJwt = localStorage.getItem("jwt");

  let endPointUpdateTask = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;

  let bodyUpdateTask = {
    completed: false,
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
      console.log(result);

      window.location.reload();
    })
    .catch((e) => {
      console.log(e);
    });

    
}




  