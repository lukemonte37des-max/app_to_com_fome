const campoPesquisa = document.getElementById("campoPesquisa");

const restaurantes = document.querySelectorAll(".card-restaurante");

const mensagemVazia = document.getElementById("mensagemVazia");

campoPesquisa.addEventListener("input", function () {
  const pesquisa = campoPesquisa.value.toLowerCase();

  let encontrados = 0;

  restaurantes.forEach(function (restaurante) {
    const nome = restaurante.innerText.toLowerCase();

    if (nome.includes(pesquisa)) {
      restaurante.style.display = "block";
      encontrados++;
    } else {
      restaurante.style.display = "none";
    }
  });

  if (encontrados === 0) {
    mensagemVazia.style.display = "block";
  } else {
    mensagemVazia.style.display = "none";
  }
});
