let ulTarefaTerminada = document.querySelector(".tarefas-terminadas");

let btnCompleted = document.querySelector(".not-done");

btnCompleted.addEventListener("click", (e) => {

    function getId(tarefa){
        
    }

    function renderizaTarefasTerminadas(tarefa) {

        console.log(getId(tarefa));
        
        e.preventDefault()
        let liTarefaTerminada = document.createElement("li");
        liTarefaTerminada.classList.add("tarefa");
    
        liTarefaTerminada.innerHTML = `
            <div class="done"></div>
            <div class="descricao">
            <p class="nome">${tarefa.descricao}</p>
            <div>
                <button><i id="${tarefa.id}" class="fas fa-undo-alt change"></i></button>
                <button><i id="${tarefa.id}" class="far fa-trash-alt"></i></button>
            </div>
            </div>
    
        `;
    
        ulTarefaTerminada.appendChild(liTarefaTerminada);
    }

    renderizaTarefasTerminadas()
    

    
});

