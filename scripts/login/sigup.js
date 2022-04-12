let inputNome = document.getElementById("inputNome");
let inputApelido = document.getElementById("inputApelido");
let inputEmail = document.getElementById("inputEmail");
let inputSenha = document.getElementById("inputSenha");
let inputRepetirSenha = document.getElementById("inputRepetirSenha");
let botaoCriarConta = document.getElementById("btnCriarConta");

let campoNomeNormalizado;
let campoApelidoNormalizado;
let campoEmailNormalizado;
let campoSenhaNormalizado;
let campoRepetirSenhaNormalizado;

let novoUsuario = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

let emailValido = false;
let senhaValida = false;
let nomeValido = false;

// Validação para verificar se os campos estão preenchidos e se estiverem para normalizar, deixar sem espaços e tudo minusculo, exceto o apelido.

botaoCriarConta.addEventListener("click", (e) => {
  e.preventDefault(); // está aqui para fins de teste (visualizar no console do navegador)

  if (validacaoTelaDeLogin()) {
    // Normalizando os inputs'
    campoNomeNormalizado = retiraEspacosDeUmValor(inputNome.value);
    campoNomeNormalizado = conventerValorRecebidoParaMinusculo(inputNome.value);
    campoApelidoNormalizado = retiraEspacosDeUmValor(inputApelido.value);
    campoEmailNormalizado = retiraEspacosDeUmValor(inputEmail.value);
    campoEmailNormalizado = conventerValorRecebidoParaMinusculo(
      campoEmailNormalizado
    );
    campoSenhaNormalizado = conventerValorRecebidoParaMinusculo(
      inputSenha.value
    );
    campoRepetirSenhaNormalizado = conventerValorRecebidoParaMinusculo(
      inputRepetirSenha.value
    );

    novoUsuario.firstName = campoNomeNormalizado;
    novoUsuario.lastName = campoApelidoNormalizado;
    novoUsuario.email = campoEmailNormalizado;
    novoUsuario.password = campoSenhaNormalizado;
    novoUsuario.repetirSenha = campoRepetirSenhaNormalizado;

    // @ Criando um novo usuário pela API
    let cadastroJson = JSON.stringify(novoUsuario);
    let endPointLogin = "https://ctd-todo-api.herokuapp.com/v1/users";

    let configNewUser = {
      method: 'POST',
      body: 
        cadastroJson,
      headers: {
        'content-type': 'application/json',
      },
    };

    fetch(endPointLogin, configNewUser).then(
      result => {
        if(result.status == 201) {
          return result.json();
        }
    }
    ).then(
      result => {
        cadastroSucesso()
    }
    ).catch(
      erro => {
        console.log(erro);
      }
    );
  } else {
    alert("Ambos os campos devem ser preenchidos !");
  }
});

function cadastroSucesso() {
  alert ("Cadastro efetuado com sucesso !")
  location.href = "index.html"

}

// Validação do campo de nome

inputNome.addEventListener("blur", () => {
  let smallNome = document.getElementById("smallNome");

  if (inputNome.value != "") {
    smallNome.innerText = "";
    inputNome.style.border = "1px solid #45dd45a1";

    nomeValido = true;
  } else {
    smallNome.innerText = "Nome é obrigatório !";
    smallNome.style.color = "red";
    smallNome.style.fontWeight = "bold";
    smallNome.style.marginTop = "5px";
    smallNome.style.fontSize = "11px";
    inputNome.style.border = "1px solid red";

    nomeValido = false;
  }
  validacaoTelaDeLogin();
});

// Validação do campo de e-mail

inputEmail.addEventListener("blur", () => {
  let smallEmail = document.getElementById("smallEmail");

  if (
    inputEmail.value != "" &&
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail.value)
  ) {
    smallEmail.innerText = "";
    inputEmail.style.border = "1px solid #45dd45a1";

    emailValido = true;
  } else {
    smallEmail.innerText = "E-mail inválido";
    smallEmail.style.color = "red";
    smallEmail.style.fontSize = "11px";
    smallEmail.style.fontWeight = "bold";
    smallEmail.style.marginTop = "5px";

    inputEmail.style.border = "1px solid red";

    emailValido = false;
  }
  validacaoTelaDeLogin();
});

// Validação do tamanho da senha

inputSenha.addEventListener("keyup", () => {
  let smallSenha = document.getElementById("smallSenha");

  if (
    inputSenha.value != "" &&
    inputSenha.value.length >= 1 &&
    inputSenha.value.length <= 4
  ) {
    inputSenha.style.border = "1px solid red";
    smallSenha.style.fontWeight = "bold";
    smallSenha.innerText = "Senha muito fraca 😥";
    smallSenha.style.color = "red";
    smallSenha.style.marginTop = "10px";
    smallSenha.style.fontSize = "11px";
  } else if (
    inputSenha.value != "" &&
    inputSenha.value.length >= 5 &&
    inputSenha.value.length <= 7
  ) {
    inputSenha.style.border = "1px solid orange";
    smallSenha.style.fontWeight = "bold";
    smallSenha.style.color = "orange";
    smallSenha.innerText = "Estamos quase lá 😀";
    smallSenha.style.marginTop = "10px";
    smallSenha.style.fontSize = "11px";
  } else if (inputSenha.value != "" && inputSenha.value.length >= 8) {
    inputSenha.style.border = "1px solid #45dd45a1";
    smallSenha.style.fontWeight = "bold";
    smallSenha.style.color = "#45dd45";
    smallSenha.innerText = "Senha forte 💪";
    smallSenha.style.marginTop = "10px";
    smallSenha.style.fontSize = "11px";

    senhaValida = true;
  } else {
    smallSenha.innerText = "";
    senhaValida = false;
  }

  validacaoTelaDeLogin();
});

inputRepetirSenha.addEventListener("keyup", () => {
  // Trocado para o keyup, para validar enquanto digita
  let smallRepetirSenha = document.getElementById("smallRepetirSenha");

  if (inputSenha.value === inputRepetirSenha.value) {
    smallRepetirSenha.innerText = "Senhas iguais";
    smallRepetirSenha.style.color = "#45dd45";

    inputRepetirSenha.style.border = "1px solid #45dd45a1";
    senhaValida = true;
  } else {
    smallRepetirSenha.innerHTML = "Senha errada";
    smallRepetirSenha.style.fontWeight = "bold";
    smallRepetirSenha.style.marginTop = "5px";
    smallRepetirSenha.style.color = "red";
    smallRepetirSenha.style.fontSize = "11px";

    inputRepetirSenha.style.border = "1px solid red";
    senhaValida = false;
  }
  validacaoTelaDeLogin();
});

function validacaoTelaDeLogin() {
  // Função criada para haiblitar o botão ou não.
  if (emailValido === true && senhaValida === true && nomeValido === true) {
    // Se o e-mail for válido (true), ele habilita o botão e troca o texto para acessar

    botaoCriarConta.removeAttribute("disabled");
    botaoCriarConta.innerText = "Acessar";
    return true; // A função retorna true, pois ela pode ser utilizada como uma condicional
  } else {
    // Se o e-mail for falso (false), ele desabilita o botão e troca o texto para bloqueado.

    botaoCriarConta.setAttribute("disabled", true);
    botaoCriarConta.innerText = "Bloqueado";
    return false; // A função retorna false, pois ela pode ser utilizada como uma condicional
  }
}