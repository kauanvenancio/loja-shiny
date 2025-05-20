const produtos = [
  { id: 1, nome: 'Camiseta Rosa', preco: 49.90, imagem: 'https://via.placeholder.com/200x150/000000/FFFFFF?text=Produto' },
  { id: 2, nome: 'Tênis Branco', preco: 199.90, imagem: 'https://via.placeholder.com/200x150/000000/FFFFFF?text=Produto' },
  { id: 3, nome: 'Boné Fashion', preco: 29.90, imagem: 'https://via.placeholder.com/200x150/000000/FFFFFF?text=Produto' },
  { id: 4, nome: 'Vestido Floral', preco: 149.90, imagem: 'https://via.placeholder.com/200x150/000000/FFFFFF?text=Produto' },
  { id: 5, nome: 'Calça Jeans', preco: 89.90, imagem: 'https://via.placeholder.com/200x150/000000/FFFFFF?text=Produto' },
  { id: 6, nome: 'Jaqueta Rosa', preco: 179.90, imagem: 'https://via.placeholder.com/200x150/000000/FFFFFF?text=Produto' },
  { id: 7, nome: 'Saia Plissada', preco: 59.90, imagem: 'https://via.placeholder.com/200x150/000000/FFFFFF?text=Produto' },
  { id: 8, nome: 'Óculos de Sol', preco: 39.90, imagem: 'https://via.placeholder.com/200x150/000000/FFFFFF?text=Produto' },
  { id: 9, nome: 'Mochila Estilosa', preco: 99.90, imagem: 'https://via.placeholder.com/200x150/000000/FFFFFF?text=Produto' },
  { id: 10, nome: 'Relógio Feminino', preco: 129.90, imagem: 'https://via.placeholder.com/200x150/000000/FFFFFF?text=Produto' }
];


const carrinho = [];

const container = document.getElementById('produtos');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalSpan = document.getElementById('total');

function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;
  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    listaCarrinho.appendChild(li);
    total += item.preco;
  });
  totalSpan.textContent = total.toFixed(2);
}

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  atualizarCarrinho();
  atualizarContadorCarrinho();
}


produtos.forEach(produto => {
  const div = document.createElement('div');
  div.className = 'produto';
  div.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}">
    <h3>${produto.nome}</h3>
    <p>R$ ${produto.preco.toFixed(2)}</p>
    <button onclick='adicionarAoCarrinho(${JSON.stringify(produto)})'>Adicionar</button>
  `;
  container.appendChild(div);
});
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('aberto');
}
function atualizarContadorCarrinho() {
  document.getElementById('contador-carrinho').textContent = carrinho.length;
}

function scrollToCarrinho() {
  document.querySelector('.carrinho').scrollIntoView({ behavior: 'smooth' });
}
function filtrarProdutos() {
  const termo = document.getElementById('campo-busca').value.toLowerCase();
  const container = document.getElementById('produtos');
  const cards = container.getElementsByClassName('produto');

  for (let card of cards) {
    const nome = card.querySelector('h3').textContent.toLowerCase();
    if (nome.includes(termo)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }
}
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Gostaria de finalizar minha compra com os seguintes itens:%0A%0A";
  let total = 0;

  carrinho.forEach((produto, index) => {
    mensagem += `${index + 1}. ${produto.nome} - R$ ${produto.preco.toFixed(2)}%0A`;
    total += produto.preco;
  });

  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

  // Coloque o número da loja no formato internacional, ex: 5511999999999 (Brasil + DDD + número)
  const numeroLoja = "5545998011346";

  // URL do WhatsApp com mensagem já preenchida
  const urlWhatsApp = `https://wa.me/${numeroLoja}?text=${mensagem}`;

  // Abre o WhatsApp em nova aba
  window.open(urlWhatsApp, "_blank");
}
