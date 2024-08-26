document.getElementById('botao-adicionar-tarefa').addEventListener('click', adicionarTarefa);
document.getElementById('filtro-nome').addEventListener('keyup', filtrarTarefas);
document.getElementById('filtro-prioridade').addEventListener('change', filtrarTarefas);
document.getElementById('filtro-data').addEventListener('change', filtrarTarefas);

function adicionarTarefa() {
    const tarefaInput = document.getElementById('nova-tarefa');
    const prioridadeInput = document.getElementById('prioridade-tarefa');
    const inicioInput = document.getElementById('horario-inicio');
    const fimInput = document.getElementById('horario-fim');
    const dataInput = document.getElementById('data-tarefa');
    const listaTarefas = document.getElementById('lista-tarefas');

    if (tarefaInput.value.trim() !== '' && dataInput.value !== '') {
        const novaTarefa = document.createElement('li');
        novaTarefa.className = 'list-group-item';

        const textoTarefa = document.createElement('span');
        textoTarefa.textContent = tarefaInput.value;

        const detalhesTarefa = document.createElement('div');
        detalhesTarefa.className = 'detalhes-tarefa';
        detalhesTarefa.textContent = `Prioridade: ${prioridadeInput.value} | Horário: ${inicioInput.value} - ${fimInput.value} | Data: ${dataInput.value}`;

        const botaoEditar = document.createElement('button');
        botaoEditar.className = 'btn btn-warning btn-sm';
        botaoEditar.textContent = 'Editar';
        botaoEditar.onclick = () => editarTarefa(textoTarefa);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.className = 'btn btn-danger btn-sm';
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.onclick = () => excluirTarefa(novaTarefa);

        novaTarefa.appendChild(textoTarefa);
        novaTarefa.appendChild(detalhesTarefa);
        novaTarefa.appendChild(botaoEditar);
        novaTarefa.appendChild(botaoExcluir);
        listaTarefas.appendChild(novaTarefa);

        tarefaInput.value = '';
        inicioInput.value = '';
        fimInput.value = '';
        dataInput.value = '';
    }
}

function editarTarefa(textoTarefa) {
    const textoAtual = textoTarefa.textContent;
    textoTarefa.innerHTML = `<input type="text" class="form-control form-control-sm" value="${textoAtual}">`;
    const campoTexto = textoTarefa.querySelector('input');

    campoTexto.focus();
    campoTexto.addEventListener('blur', () => {
        textoTarefa.textContent = campoTexto.value;
    });

    campoTexto.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            textoTarefa.textContent = campoTexto.value;
        }
    });
}

function excluirTarefa(tarefaItem) {
    tarefaItem.remove();
}

function filtrarTarefas() {
    const filtroNome = document.getElementById('filtro-nome').value.toLowerCase();
    const filtroPrioridade = document.getElementById('filtro-prioridade').value;
    const filtroData = document.getElementById('filtro-data').value;

    const tarefas = document.getElementById('lista-tarefas').getElementsByTagName('li');

    Array.from(tarefas).forEach(tarefa => {
        const textoTarefa = tarefa.firstChild.textContent.toLowerCase();
        const detalhesTarefa = tarefa.querySelector('.detalhes-tarefa').textContent.toLowerCase();
        const nomeCorresponde = textoTarefa.indexOf(filtroNome) !== -1;
        const prioridadeCorresponde = filtroPrioridade === '' || detalhesTarefa.includes(filtroPrioridade.toLowerCase());
        const dataCorresponde = filtroData === '' || detalhesTarefa.includes(filtroData);

        if (nomeCorresponde && prioridadeCorresponde && dataCorresponde) {
            tarefa.style.display = '';
        } else {
            tarefa.style.display = 'none';
        }
    });
}
