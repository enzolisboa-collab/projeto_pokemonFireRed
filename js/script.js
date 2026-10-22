const listaItens = [
  { id: 1, nome: "Poké Ball", preco: 200, imagem: "./img/pokeball.png" },
  { id: 2, nome: "Potion", preco: 300, imagem: "./img/potion.png" },
  { id: 3, nome: "Antidote", preco: 100, imagem: "./img/antidote.png" },
  { id: 4, nome: "Great Ball", preco: 600, imagem: "./img/greatball.png" },
  { id: 5, nome: "Super Potion", preco: 700, imagem: "" },
  { id: 6, nome: "Parlyz Heal", preco: 200, imagem: "" },
  { id: 7, nome: "Awakening", preco: 250, imagem: "" },
  { id: 8, nome: "Burn Heal", preco: 250, imagem: "" },
  { id: 9, nome: "Ice Heal", preco: 250, imagem: "" },
  { id: 10, nome: "Repel", preco: 350, imagem: "./img/repel.png" },
  { id: 11, nome: "Escape Rope", preco: 550, imagem: "" },
  { id: 12, nome: "Hyper Potion", preco: 1200, imagem: "" },
];

const listaTMs = [
  { id: 101, nome: "TM01 Mega Punch", preco: 3000, imagem: "" },
  { id: 102, nome: "TM02 Razor Wind", preco: 2000, imagem: "" },
  { id: 103, nome: "TM05 Mega Kick", preco: 3000, imagem: "" },
  { id: 104, nome: "TM07 Horn Drill", preco: 2000, imagem: "" },
  { id: 105, nome: "TM09 Take Down", preco: 3000, imagem: "" },
  { id: 106, nome: "TM15 Hyper Beam", preco: 5500, imagem: "" },
];

const catalogoCompleto = [...listaItens, ...listaTMs];
let carrinho = {};

const elementoGrade = document.getElementById("grade-produtos");
const elementoTituloProdutos = document.getElementById("titulo-produtos");
const elementoListaCarrinho = document.getElementById("lista-carrinho");
const elementoTotal = document.getElementById("valor-total");
const botaoFinalizar = document.getElementById("botao-finalizar");
const modalSucesso = document.getElementById("modal-sucesso");

function renderizarProdutos(listaParaMostrar) {
  elementoGrade.innerHTML = "";

  listaParaMostrar.forEach((produto) => {
    const cartao = document.createElement("article");
    cartao.className = "cartao-produto";

    cartao.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="imagem-produto">
            <h3 class="nome-produto">${produto.nome}</h3>
            <div class="rodape-cartao">
                <span class="texto-escuro">$ ${produto.preco}</span>
                <button class="botao-comprar-item" onclick="adicionarAoCarrinho(${produto.id})">Comprar</button>
            </div>
        `;
    elementoGrade.appendChild(cartao);
  });
}

function mudarAba(aba) {
  document.getElementById("aba-itens").classList.remove("ativo");
  document.getElementById("aba-tms").classList.remove("ativo");

  if (aba === "itens") {
    document.getElementById("aba-itens").classList.add("ativo");
    elementoTituloProdutos.innerText = "Itens Disponíveis";
    renderizarProdutos(listaItens);
  } else {
    document.getElementById("aba-tms").classList.add("ativo");
    elementoTituloProdutos.innerText = "Máquinas Técnicas (TMs)";
    renderizarProdutos(listaTMs);
  }
}

function mudarTema(novoTema) {
  document.body.className = "";
  if (novoTema !== "padrao") document.body.classList.add(novoTema);
}

function adicionarAoCarrinho(idProduto) {
  carrinho[idProduto] = (carrinho[idProduto] || 0) + 1;
  atualizarCarrinho();
}

function removerDoCarrinho(idProduto) {
  if (carrinho[idProduto]) {
    carrinho[idProduto]--;
    if (carrinho[idProduto] <= 0) delete carrinho[idProduto];
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  elementoListaCarrinho.innerHTML = "";
  let valorTotal = 0;
  const idsNoCarrinho = Object.keys(carrinho);

  if (idsNoCarrinho.length === 0) {
    elementoListaCarrinho.innerHTML =
      '<p style="color: #000;">Sua mochila está vazia.</p>';
    elementoTotal.innerText = "$ 0";
    botaoFinalizar.disabled = true;
    return;
  }

  botaoFinalizar.disabled = false;

  idsNoCarrinho.forEach((idString) => {
    const idInt = parseInt(idString);
    const quantidade = carrinho[idInt];
    const produtoInfo = catalogoCompleto.find((p) => p.id === idInt);

    valorTotal += produtoInfo.preco * quantidade;

    const divItem = document.createElement("div");
    divItem.className = "item-carrinho";
    divItem.innerHTML = `
            <div class="info-item">
                <div class="nome-item">${produtoInfo.nome}</div>
                <div class="texto-escuro">$ ${produtoInfo.preco}</div>
            </div>
            <div class="controles-quantidade">
                <button class="botao-qtd" onclick="removerDoCarrinho(${idInt})">-</button>
                <span class="texto-escuro">${quantidade}</span>
                <button class="botao-qtd" onclick="adicionarAoCarrinho(${idInt})">+</button>
            </div>
        `;
    elementoListaCarrinho.appendChild(divItem);
  });

  elementoTotal.innerText = `$ ${valorTotal}`;
}

function finalizarCompra() {
  modalSucesso.classList.remove("oculto");
  carrinho = {};
  atualizarCarrinho();
}

function fecharModal() {
  modalSucesso.classList.add("oculto");
}

window.onload = () => {
  renderizarProdutos(listaItens);
  atualizarCarrinho();
};
