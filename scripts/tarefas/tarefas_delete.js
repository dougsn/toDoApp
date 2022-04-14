function deleteTask(event) {
    let tokenJwt = localStorage.getItem("jwt");
  
    let endPointDeleteTask = `https://ctd-todo-api.herokuapp.com/v1/tasks/${event}`;
  
  
    let configDeleteTasks = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: tokenJwt,
      },
    };
  
    fetch(endPointDeleteTask, configDeleteTasks)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
          window.location.reload();
      })
      .catch((e) => {
        alert(e);
      });
  }