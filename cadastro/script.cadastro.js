(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_clientes')) ?? [];
}

function setLocalStorage(bd_clientes) {
  localStorage.setItem('bd_clientes', JSON.stringify(bd_clientes));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { 
  limparTabela();
  const bd_clientes = getLocalStorage();
  let index = 0;
  for (cliente of bd_clientes) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${cliente.modelos}</td>
        <td>${cliente.cor}</td>
        <td>${cliente.tamanho}</td>
        <td>${cliente.marca}</td>
        <td>${cliente.preco}</td>
        <td>${cliente.secao}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { 
  const cliente = {
    modelos: document.getElementById('modelos').value,
    cor: document.getElementById('cor').value,
    tamanho: document.getElementById('tamanho').value,
    marca: document.getElementById('marca').value,
    preco: document.getElementById('preco').value,
    secao: document.getElementById('secao').value,
  }
  const bd_clientes = getLocalStorage();
  bd_clientes.push(cliente);
  setLocalStorage(bd_clientes);
  atualizarTabela();
}

function excluir(index) { 
  const bd_clientes = getLocalStorage();
  bd_clientes.splice(index, 1);
  setLocalStorage(bd_clientes);
  atualizarTabela();
}

function validarSerial() { 
  const bd_clientes = getLocalStorage();
  for (cliente of bd_clientes) {
    if (numserial.value == cliente.numserial) {
      numserial.setCustomValidity("Este número de serial já existe!");
      feedbackNumSerial.innerText = "Este número de serial já existe!";
      return false;
    } else {
      numserial.setCustomValidity("");
      feedbackNumSerial.innerText = "Informe o número de serial corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada
const numserial = document.getElementById("numserial");
const feedbackNumSerial = document.getElementById("feedbackNumSerial");
numserial.addEventListener('input', validarSerial);