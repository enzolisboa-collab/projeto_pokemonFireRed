// Verifica se o JS conectou (Aperte F12 para ver isso no navegador)
console.log("O JavaScript conectou com sucesso!");

// 1. DADOS DOS PRODUTOS
const listaItens = [
    { id: 1, nome: "Poké Ball", preco: 200, imagem: "" },
    { id: 2, nome: "Potion", preco: 300, imagem: "" },
    { id: 3, nome: "Antidote", preco: 100, imagem: "" },
    { id: 4, nome: "Great Ball", preco: 600, imagem: "" },
    { id: 5, nome: "Super Potion", preco: 700, imagem: "" },
    { id: 6, nome: "Parlyz Heal", preco: 200, imagem: "" },
    { id: 7, nome: "Awakening", preco: 250, imagem: "" },
    { id: 8, nome: "Burn Heal", preco: 250, imagem: "" },
    { id: 9, nome: "Ice Heal", preco: 250, imagem: "" },
    { id: 10, nome: "Repel", preco: 350, imagem: "" },
    { id: 11, nome: "Escape Rope", preco: 550, imagem: "" },
    { id: 12, nome: "Hyper Potion", preco: 1200, imagem: "" },
    { id: 13, nome: "Super Repel", preco: 500, imagem: "" },
    { id: 14, nome: "Revive", preco: 1500, imagem: "" },
    { id: 15, nome: "Ultra Ball", preco: 1200, imagem: "" },
    { id: 16, nome: "Full Heal", preco: 600, imagem: "" },
    { id: 17, nome: "Max Repel", preco: 700, imagem: "" },
    { id: 18, nome: "Max Potion", preco: 2500, imagem: "" },
    { id: 19, nome: "Full Restore", preco: 3000, imagem: "" }
];

const listaTMs = [
    { id: 101, nome: "TM01 Mega Punch", preco: 3000, imagem: "" },
    { id: 102, nome: "TM02 Razor Wind", preco: 2000, imagem: "" },
    { id: 103, nome: "TM05 Mega Kick", preco: 3000, imagem: "" },
    { id: 104, nome: "TM07 Horn Drill", preco: 2000, imagem: "" },
    { id: 105, nome: "TM09 Take Down", preco: 3000, imagem: "" },
    { id: 106, nome: "TM15 Hyper Beam", preco: 5500, imagem: "" },
    { id: 107, nome: "TM32 Double Team", preco: 1000, imagem: "" },
    { id: 108, nome: "TM33 Reflect", preco: 1000, imagem: "" },
    { id: 109, nome: "TM37 Sludge Bomb", preco: 2000, imagem: "" },
    { id: 110, nome: "TM50 Substitute", preco: 2000, imagem: "" }
];

// Combina ambas as listas para buscar os preços fáceis
const catalogoCompleto = [...listaItens, ...listaTMs];

// 2. ESTADO DA APLICAÇÃO
let carrinho = {}; 

// Elementos do DOM
const elementoGrade = document.getElementById('grade-produtos');
const elementoTituloProdutos = document.getElementById('titulo-produtos');
const elementoListaCarrinho = document.getElementById('lista-carrinho');
const elementoTotal = document.getElementById('valor-total');
const botaoFinalizar = document.getElementById('botao-finalizar');
const modalSucesso = document.getElementById('modal-sucesso');

// 3. FUNÇÕES

// Renderiza os produtos na tela
function renderizarProdutos(listaParaMostrar) {
    elementoGrade.innerHTML = ''; // Limpa a tela antes de desenhar
    
    listaParaMostrar.forEach(produto => {
        const cartao = document.createElement('article');
        cartao.className = 'cartao-produto';
        
        cartao.innerHTML = `
            <img src="${produto.imagem}" alt="Imagem de ${produto.nome}" class="imagem-produto">
            <h3 class="nome-produto">${produto.nome}</h3>
            <div class="rodape-cartao">
                <span class="texto-escuro">$ ${produto.preco}</span>
                <button class="botao-comprar-item" onclick="adicionarAoCarrinho(${produto.id})">Comprar</button>
            </div>
        `;
        
        elementoGrade.appendChild(cartao);
    });
}

// Alterna entre abas (Itens e TMs)
function mudarAba(aba) {
    document.getElementById('aba-itens').classList.remove('ativo');
    document.getElementById('aba-tms').classList.remove('ativo');
    
    if (aba === 'itens') {
        document.getElementById('aba-itens').classList.add('ativo');
        elementoTituloProdutos.innerText = 'Itens Disponíveis';
        renderizarProdutos(listaItens);
    } else {
        document.getElementById('aba-tms').classList.add('ativo');
        elementoTituloProdutos.innerText = 'Máquinas Técnicas (TMs)';
        renderizarProdutos(listaTMs);
    }
}

// Troca de Tema (Cores)
function mudarTema(novoTema) {
    document.body.className = ''; // Remove temas anteriores
    if (novoTema !== 'padrao') {
        document.body.classList.add(novoTema);
    }
}

// Carrinho: Adicionar
function adicionarAoCarrinho(idProduto) {
    if (carrinho[idProduto]) {
        carrinho[idProduto]++;
    } else {
        carrinho[idProduto] = 1;
    }
    atualizarCarrinho();
}

// Carrinho: Remover
function removerDoCarrinho(idProduto) {
    if (carrinho[idProduto]) {
        carrinho[idProduto]--;
        if (carrinho[idProduto] <= 0) {
            delete carrinho[idProduto];
        }
    }
    atualizarCarrinho();
}

// Atualiza a visualização do carrinho e o total
function atualizarCarrinho() {
    elementoListaCarrinho.innerHTML = '';
    let valorTotal = 0;
    const idsNoCarrinho = Object.keys(carrinho);

    if (idsNoCarrinho.length === 0) {
        elementoListaCarrinho.innerHTML = '<p style="color: #000;">Sua mochila está vazia.</p>';
        elementoTotal.innerText = '$ 0';
        botaoFinalizar.disabled = true;
        return;
    }

    botaoFinalizar.disabled = false;

    idsNoCarrinho.forEach(idString => {
        const idInt = parseInt(idString);
        const quantidade = carrinho[idInt];
        const produtoInfo = catalogoCompleto.find(p => p.id === idInt);

        valorTotal += (produtoInfo.preco * quantidade);

        const divItem = document.createElement('div');
        divItem.className = 'item-carrinho';
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

// Modal de Compra
function finalizarCompra() {
    modalSucesso.classList.remove('oculto');
    carrinho = {}; 
    atualizarCarrinho();
}

function fecharModal() {
    modalSucesso.classList.add('oculto');
}

// Inicialização: Desenha os itens assim que a página carrega
window.onload = () => {
    renderizarProdutos(listaItens);
    atualizarCarrinho();
};