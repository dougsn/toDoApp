onload = () => {
  let nomeUsuario = document.querySelector(".user-info p");
  let endPointLogin = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";

  let tokenJwt = localStorage.getItem("jwt");
  console.log(tokenJwt);
  let configRequisicao = {
    method: "GET",
    headers: {
      authorization: tokenJwt,
    },
  };

  // @@ Criando a requisição para pegar as informações do usuário

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

  let endPointTask = "https://ctd-todo-api.herokuapp.com/v1/tasks";

  // @@ Criando a requisição para pegar as informações das tarefas

  fetch(endPointTask, configRequisicao)
    .then((result) => {
      if (result.status == 200) {
        return result.json();
      }
    })
    .then((result) => {
      console.log(result);
      result.forEach(element => {
        console.log(element);
      tarefaPendente(element)
      }) 

    })
    .catch((erro) => {
      console.log(erro);
    });

  // @@ Criando a requisição para criar uma tarefa e mostrar no console.

  let formTarefa = document.querySelector(".nova-tarefa button");

  formTarefa.addEventListener("click", (e) => {
    e.preventDefault();

    const inputTarefa = document.getElementById("novaTarea").value;

    let bodyNewTask = {
      description: inputTarefa,
      completed: false,
    };

    let newTaskJson = JSON.stringify(bodyNewTask); // Foi convertida para JSON para conseguirmos enviar para o servidor

    let configNewTasks = {
      method: "POST",
      body: newTaskJson,
      headers: {
        "content-type": "application/json",
        authorization: tokenJwt,
      },
    };

    fetch(endPointTask, configNewTasks)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  function tarefaPendente(e) {
 
      
    let tarefasPendentesHtml = document.querySelector('.tarefas-pendentes')
        console.log(e);
        const pendente = tarefasPendentesHtml.innerHTML = `
        <li class="tarefa">
            <div class="not-done" id="${e.id}"></div>
            <div class="descricao">
                <p class="nome">${e.description}</p>
                <p class="timestamp"><i class="far fa-calendar-alt"></i> ${e.createdAt}</p>
            </div>
          </li>
        `
        
      tarefasPendentesHtml.appendChild(pendente)


  }
};
