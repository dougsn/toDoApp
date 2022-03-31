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
  nome: "",
  apelido: "",
  email: "",
  senha: "",
  repetirSenha: "",
};

let emailValido = false;
let senhaValida = false;

// Validação para verificar se os campos estão preenchidos e se estiverem para normalizar, deixar sem espaços e tudo minusculo, exceto o apelido.

botaoCriarConta.addEventListener("click", (e) => {
  e.preventDefault();
  // inputNome.value != "" &&
  // inputApelido.value != "" &&
  // inputEmail.value != "" &&       Estava dentro do IF, estou testando a criação da função do botão.
  // inputSenha.value != "" &&
  // inputRepetirSenha.value != ""

  if (validacaoTelaDeLogin()) {
    // Normalizando os inputs
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

    novoUsuario.nome = campoNomeNormalizado;
    novoUsuario.apelido = campoApelidoNormalizado;
    novoUsuario.email = campoEmailNormalizado;
    novoUsuario.senha = campoSenhaNormalizado;
    novoUsuario.repetirSenha = campoRepetirSenhaNormalizado;

    console.log(novoUsuario);
  } else {
    event.preventDefault();
    alert("Ambos os campos devem ser preenchidos !");
  }
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
    smallEmail.style.fontSize = "8px";
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

  // if (
  //   inputSenha.value != "" &&
  //   inputSenha.value.length >= 6 &&
  //   inputSenha.value.length <= 10
  // ) {
  //   smallSenha.innerText = "";
  //   inputSenha.style.border = "1px solid #45dd45a1";
  //   senhaValida = true;                                          Estava antes, testando outras possibilidades.
  // } else {
  //   smallSenha.innerText = "Senha inválido";
  //   smallSenha.style.color = "red";
  //   smallSenha.style.fontSize = "8px";
  //   smallSenha.style.fontWeight = "bold";
  //   smallSenha.style.marginTop = "5px";

  //   inputSenha.style.border = "1px solid red";
  //   senhaValida = false;
  // }

  if (inputSenha.value.length === 1) {
    inputSenha.style.border = "1px solid red";
    smallSenha.innerText = "Senha muito fraca 😥";
    smallSenha.style.color = "red";
    smallSenha.style.marginTop = "10px";
  } else if (inputSenha.value.length === 4) {
    inputSenha.style.border = "1px solid orange";
    smallSenha.style.color = "orange";
    smallSenha.innerText = "Estamos quase lá 😀";
    smallSenha.style.marginTop = "10px";
  } else if (inputSenha.value.length === 6) {
    inputSenha.style.border = "1px solid #45dd45a1";
    smallSenha.style.color = "#45dd45a1";
    smallSenha.innerText = "Senha forte 💪";
    smallSenha.style.marginTop = "10px";
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
    smallRepetirSenha.style.fontSize = "8px";
    smallRepetirSenha.style.fontWeight = "bold";
    smallRepetirSenha.style.marginTop = "5px";
    smallRepetirSenha.style.color = "red";

    inputRepetirSenha.style.border = "1px solid red";
    senhaValida = false;
  }
  validacaoTelaDeLogin();
});

function validacaoTelaDeLogin() {
  // Função criada para haiblitar o botão ou não.
  if (emailValido === true && senhaValida === true) {
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
