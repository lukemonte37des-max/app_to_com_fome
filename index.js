// ===================================
// TÔ COM FOME - PÁGINA PRINCIPAL
// ===================================

// RECUPERAR USUÁRIO LOGADO
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

// ELEMENTO DA SAUDAÇÃO
const saudacao = document.getElementById("saudacao");

// VERIFICAR SE EXISTE USUÁRIO LOGADO
if (usuarioLogado) {
  saudacao.textContent = "Bem-vindo, " + usuarioLogado.nome + "! 👋";
} else {
  saudacao.textContent = "Bem-vindo ao Tô com Fome! 👋";
}

// ===================================
// BOTÃO SAIR
// ===================================

const botaoSair = document.getElementById("botaoSair");

if (botaoSair) {
  botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");

    window.location.href = "login.html";
  });
}
