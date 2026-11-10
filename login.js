// ========================================
// TÔ COM FOME APP - LOGIN E CADASTRO
// ========================================

// ELEMENTOS DO HTML
const formulario = document.getElementById("formulario");

const campoNome = document.getElementById("campoNome");
const nome = document.getElementById("nome");

const email = document.getElementById("email");
const senha = document.getElementById("senha");

const titulo = document.getElementById("titulo");
const subtitulo = document.getElementById("subtitulo");

const botao = document.getElementById("botao");
const trocar = document.getElementById("trocar");
const alternativa = document.getElementById("alternativa");

const mensagem = document.getElementById("mensagem");

// CONTROLE DO MODO
let modoCadastro = false;

// CHAVE DE ARMAZENAMENTO
const CHAVE_USUARIOS = "usuariosToComFome";

// ========================================
// ALTERNAR ENTRE LOGIN E CADASTRO
// ========================================

trocar.addEventListener("click", function (evento) {
  evento.preventDefault();

  modoCadastro = !modoCadastro;

  mensagem.textContent = "";
  formulario.reset();

  if (modoCadastro) {
    titulo.textContent = "Crie sua conta!";

    subtitulo.textContent = "Cadastre-se para fazer seus pedidos.";

    botao.textContent = "Criar conta";

    campoNome.classList.remove("oculto");

    nome.required = true;

    alternativa.innerHTML =
      'Já tem uma conta? <a href="#" id="trocar">Entrar</a>';
  } else {
    titulo.textContent = "Bem-vindo de volta!";

    subtitulo.textContent = "Entre na sua conta para fazer seus pedidos.";

    botao.textContent = "Entrar";

    campoNome.classList.add("oculto");

    nome.required = false;

    alternativa.innerHTML =
      'Ainda não tem uma conta? <a href="#" id="trocar">Cadastre-se</a>';
  }

  // Atualiza o botão de alternância
  atualizarBotaoTrocar();

  // Volta a senha para o modo oculto
  senha.type = "password";
  atualizarBotaoSenha();
});

// ========================================
// ATUALIZAR LINK DE LOGIN/CADASTRO
// ========================================

function atualizarBotaoTrocar() {
  const novoLink = alternativa.querySelector("#trocar");

  novoLink.addEventListener("click", function (evento) {
    evento.preventDefault();

    modoCadastro = !modoCadastro;

    mensagem.textContent = "";
    formulario.reset();

    if (modoCadastro) {
      titulo.textContent = "Crie sua conta!";
      subtitulo.textContent = "Cadastre-se para fazer seus pedidos.";

      botao.textContent = "Criar conta";

      campoNome.classList.remove("oculto");
      nome.required = true;

      alternativa.innerHTML =
        'Já tem uma conta? <a href="#" id="trocar">Entrar</a>';
    } else {
      titulo.textContent = "Bem-vindo de volta!";
      subtitulo.textContent = "Entre na sua conta para fazer seus pedidos.";

      botao.textContent = "Entrar";

      campoNome.classList.add("oculto");
      nome.required = false;

      alternativa.innerHTML =
        'Ainda não tem uma conta? <a href="#" id="trocar">Cadastre-se</a>';
    }

    atualizarBotaoTrocar();

    senha.type = "password";
    atualizarBotaoSenha();
  });
}

// ========================================
// MOSTRAR E ESCONDER SENHA
// ========================================

const campoSenha = senha.parentElement;

campoSenha.style.position = "relative";

senha.style.paddingRight = "75px";

const botaoSenha = document.createElement("button");

botaoSenha.type = "button";
botaoSenha.className = "botao-senha";
botaoSenha.textContent = "Mostrar";
botaoSenha.setAttribute("aria-label", "Mostrar senha");

botaoSenha.style.position = "absolute";
botaoSenha.style.right = "8px";
botaoSenha.style.bottom = "5px";
botaoSenha.style.width = "auto";
botaoSenha.style.margin = "0";
botaoSenha.style.padding = "8px";
botaoSenha.style.background = "transparent";
botaoSenha.style.color = "#ff6b00";
botaoSenha.style.fontSize = "12px";
botaoSenha.style.boxShadow = "none";
botaoSenha.style.transform = "none";

campoSenha.appendChild(botaoSenha);

botaoSenha.addEventListener("click", function () {
  senha.type = senha.type === "password" ? "text" : "password";

  atualizarBotaoSenha();
});

function atualizarBotaoSenha() {
  const visivel = senha.type === "text";

  botaoSenha.textContent = visivel ? "Ocultar" : "Mostrar";

  botaoSenha.setAttribute(
    "aria-label",
    visivel ? "Ocultar senha" : "Mostrar senha",
  );

  botaoSenha.setAttribute("aria-pressed", String(visivel));
}

// ========================================
// BUSCAR USUÁRIOS CADASTRADOS
// ========================================

function buscarUsuarios() {
  try {
    const dados = localStorage.getItem(CHAVE_USUARIOS);

    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Erro ao buscar usuários:", erro);

    return [];
  }
}

// ========================================
// SALVAR USUÁRIOS
// ========================================

function salvarUsuarios(usuarios) {
  try {
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));

    return true;
  } catch (erro) {
    console.error("Erro ao salvar usuários:", erro);

    mensagem.textContent = "Não foi possível salvar os dados neste navegador.";

    return false;
  }
}

// ========================================
// EXIBIR MENSAGENS
// ========================================

function mostrarMensagem(texto, sucesso = false) {
  mensagem.textContent = texto;

  mensagem.style.color = sucesso ? "#16803c" : "#e53935";
}

// ========================================
// PROCESSAR LOGIN E CADASTRO
// ========================================

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nomeUsuario = nome.value.trim();

  const emailUsuario = email.value.trim().toLowerCase();

  const senhaUsuario = senha.value;

  // VALIDAR CAMPOS
  if (!emailUsuario || !senhaUsuario) {
    mostrarMensagem("Preencha todos os campos.");

    return;
  }

  // BUSCAR USUÁRIOS
  const usuarios = buscarUsuarios();

  // ====================================
  // CADASTRO
  // ====================================

  if (modoCadastro) {
    if (!nomeUsuario) {
      mostrarMensagem("Digite seu nome completo.");

      return;
    }

    if (senhaUsuario.length < 6) {
      mostrarMensagem("A senha precisa ter pelo menos 6 caracteres.");

      return;
    }

    const usuarioExiste = usuarios.some(function (usuario) {
      return usuario.email === emailUsuario;
    });

    if (usuarioExiste) {
      mostrarMensagem("Este e-mail já está cadastrado.");

      return;
    }

    const novoUsuario = {
      nome: nomeUsuario,
      email: emailUsuario,
      senha: senhaUsuario,
    };

    usuarios.push(novoUsuario);

    if (!salvarUsuarios(usuarios)) {
      return;
    }

    mostrarMensagem("Conta criada com sucesso! Agora faça seu login.", true);

    // VOLTAR PARA A TELA DE LOGIN
    modoCadastro = false;

    formulario.reset();

    titulo.textContent = "Bem-vindo de volta!";

    subtitulo.textContent = "Entre na sua conta para fazer seus pedidos.";

    botao.textContent = "Entrar";

    campoNome.classList.add("oculto");

    nome.required = false;

    alternativa.innerHTML =
      'Ainda não tem uma conta? <a href="#" id="trocar">Cadastre-se</a>';

    atualizarBotaoTrocar();

    senha.type = "password";

    atualizarBotaoSenha();

    return;
  }

  // ====================================
  // LOGIN
  // ====================================

  const usuarioEncontrado = usuarios.find(function (usuario) {
    return usuario.email === emailUsuario && usuario.senha === senhaUsuario;
  });

  if (!usuarioEncontrado) {
    mostrarMensagem("E-mail ou senha incorretos.");

    return;
  }

  mostrarMensagem(
    "Login realizado com sucesso! Bem-vindo, " + usuarioEncontrado.nome + "!",
    true,
  );

  console.log("Usuário conectado:", usuarioEncontrado.nome);
});
