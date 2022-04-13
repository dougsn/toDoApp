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
    })
    .catch((erro) => {
      console.log(erro);
    });

  // @@ Criando a requisição para criar uma tarefa e amostrar no console.

  let formTarefa = document.querySelector(".nova-tarefa button");

  formTarefa.addEventListener("click", (e) => {
    e.preventDefault();

    
  let inputTarefa = document.getElementById("novaTarea").value;

    
    let endPointTask = "https://ctd-todo-api.herokuapp.com/v1/tasks";

    // let taskUsuario = JSON.stringify(newTask)

    let configNewTasks = {
      method: 'POST',
      body: {
        "description": inputTarefa,
        "completed": false,
      },
      headers: {
       authorization: tokenJwt,
      },
    };

    fetch(endPointTask, configNewTasks)
      .then(result => {
          return result.json();
      })
      .then(result => {
          console.log(result);
      })
      .catch(e => {
          console.log(e);
      })
  });
};
