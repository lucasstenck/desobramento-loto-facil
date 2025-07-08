let qtdSelecionada = 17;

function alterarQtd(valor) {
  qtdSelecionada += valor;
  if (qtdSelecionada < 17) qtdSelecionada = 17;
  if (qtdSelecionada > 22) qtdSelecionada = 22;

  document.getElementById('qtd-aposta').innerText = qtdSelecionada;
}



document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('numeros-lotofacil');

  for (let i = 1; i <= 25; i++) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = i;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(i.toString().padStart(2, '0')));

    container.appendChild(label);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('numeros-lotofacil');
  let qtdSelecionada = 15;

 function atualizarSelecao() {
  const container = document.getElementById('numeros-lotofacil');
  const qtdSelecionada = parseInt(document.getElementById('qtd-aposta').innerText, 10);
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.onclick = () => {
      const selecionados = container.querySelectorAll('input[type="checkbox"]:checked').length;
      if (selecionados > qtdSelecionada) {
        checkbox.checked = false; // Bloqueia passar do limite
        //alert(`Você só pode selecionar ${qtdSelecionada} números.`);
      }
    };
  });
}


  function gerarNumeros() {
    container.innerHTML = '';
    for (let i = 1; i <= 25; i++) {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = i;

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(i.toString().padStart(2, '0')));

      container.appendChild(label);
    }
    atualizarSelecao();
  }

  gerarNumeros();

  window.alterarQtd = (valor) => {
    qtdSelecionada += valor;
    if (qtdSelecionada < 17) qtdSelecionada = 17;
    if (qtdSelecionada > 22) qtdSelecionada = 22;

    document.getElementById('qtd-aposta').innerText = qtdSelecionada;
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    atualizarSelecao();
  };
});




function gerarDesdobramento() {
  const selecionados = Array.from(document.querySelectorAll('#numeros-lotofacil input:checked')).map(el => el.value);
  const garantia = document.getElementById('garantia').value;
  const resultadoDiv = document.getElementById('resultado-lotofacil');
  const qtdSelecionada = parseInt(document.getElementById('qtd-aposta').innerText, 10);

  resultadoDiv.innerHTML = ''; // limpa antes de gerar novo

  // Validação básica
  if (selecionados.length !== qtdSelecionada) {
    resultadoDiv.innerText = `Você deve selecionar exatamente ${qtdSelecionada} números.`;
    return;
  }

  // Tabela de regras para Lotofácil
  const regras = {
    "12": {20: 4, 21: 13},
    "13": {18: 6, 19: 21, 20: 41, 21: 191, 22: 276},
    "14": {17: 85, 18: 348, 19: 1104, 20: 3876, 21: 12376}
  };

  const quantidadeJogos = (regras[garantia] && regras[garantia][qtdSelecionada]) || 0;

  if (quantidadeJogos > 0) {
    const combinacoes = gerarCombinacoesAleatorias(selecionados, 15, quantidadeJogos);
    resultadoDiv.innerHTML = `<h3>${combinacoes.length} jogos foram gerados</h3>`;
    resultadoDiv.innerHTML += combinacoes.map(c => `<p>${c.join(' - ')}</p>`).join('');
    mostrarResultados(combinacoes, resultadoDiv);
  } else {
    resultadoDiv.innerHTML = `<p>Esta condição ainda não foi implementada.</p>`;
  }
}




function gerarCombinacoesAleatorias(numeros, tamanho, quantidade) {
  const combinacoes = new Set();
  let tentativas = 0;

  while (combinacoes.size < quantidade && tentativas < 100000) { // limite de tentativas pra segurança
    tentativas++;
    // Faz uma cópia dos números antes de embaralhar para não alterar o array original
    const copia = [...numeros];
    const combinacao = copia
      .sort(() => 0.5 - Math.random())
      .slice(0, tamanho)
      .sort((a, b) => a - b);

    combinacoes.add(combinacao.join(',')); // String única para cada combinação
  }

  // Converte de volta para array de arrays de string
  return Array.from(combinacoes).map(c => c.split(','));
}




// Função auxiliar para gerar combinações únicas aleatórias
function gerarCombinacoesAleatorias(numeros, tamanho, quantidade) {
  const combinacoes = new Set();

  while (combinacoes.size < quantidade) {
    const combinacao = numeros
      .sort(() => 0.5 - Math.random())
      .slice(0, tamanho)
      .sort((a, b) => a - b);

    combinacoes.add(combinacao.join(','));
  }

  return Array.from(combinacoes).map(c => c.split(','));
}


// Função complementar para manter a seleção ao alterar quantidade de números
function manterSelecaoAoAlterarQtd() {
  const container = document.getElementById('numeros-lotofacil');
  // Salva os valores selecionados antes da mudança
  const selecionadosAntes = Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

  // Limpa e recria todos os checkboxes mantendo os selecionados
  container.innerHTML = '';
  for (let i = 1; i <= 25; i++) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = i;
    if (selecionadosAntes.includes(i.toString())) checkbox.checked = true;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(i.toString().padStart(2, '0')));
    container.appendChild(label);
  }
  // Chama atualizarSelecao para aplicar o limite de seleção!
  if (typeof atualizarSelecao === 'function') atualizarSelecao();
}


function marcarAleatorios() {
  const container = document.getElementById('numeros-lotofacil');
  const checkboxes = Array.from(container.querySelectorAll('input[type="checkbox"]'));
  const qtdSelecionada = parseInt(document.getElementById('qtd-aposta').innerText, 10);

  // Desmarca todos antes
  checkboxes.forEach(checkbox => checkbox.checked = false);

  // Gera um array de índices de 0 a 24 e embaralha
  let indices = Array.from({length: 25}, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Marca os primeiros 'qtdSelecionada'
  for (let i = 0; i < qtdSelecionada; i++) {
    checkboxes[indices[i]].checked = true;
  }
}

function limparCheckboxes() {
  const container = document.getElementById('numeros-lotofacil');
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => checkbox.checked = false);
}



function mostrarResultados(combinacoes, resultadoDiv) {
    const precoTotal = combinacoes.length * 3;
    resultadoDiv.innerHTML = `
      <h3>${combinacoes.length} jogos foram gerados</h3>
      <p style="font-weight:bold; color:#2e7d32; margin-bottom:10px;">
        Preço total: R$ ${precoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
      </p>
      ${combinacoes.map(c => `<p>${c.join(' - ')}</p>`).join('')}
    `;
}
