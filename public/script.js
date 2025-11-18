
let form = document.getElementById("addFilme")
 
function buscarFilme() {
  const id = document.getElementById("idFilme").value
  let url = `/filmes/`

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(id)
      for(let i = 0; i < data.length; i++) {
        
        if(data[i].id_filmes == id){
          console.log(data[i])
           document.getElementById("titulo").innerHTML = "Titulo: " + data[i].nome
          document.getElementById("diretor").innerHTML = "Diretor: " + data[i].diretor
          document.getElementById("ano").innerHTML = "Ano de lançamento: " + data[i].ano
          document.getElementById("genero").innerHTML = "Genero: " + data[i].genero
        }
      }

     
    })
    .catch(error => {
      console.error(error)
    })
}
 

function avaliacoesFilme(idFilme) {
  fetch('/avaliacoes')
    .then(response => response.json())
    .then(data => {

      // filtra avaliações daquele filme
      const avaliacoes = data.filter(av => av.id_filmes == idFilme)

      // pega o container do filme certo
      const div = document.getElementById(`avaliacoes-${idFilme}`)
      div.innerHTML = "" // limpa antes de colocar novas

      if (avaliacoes.length === 0) {
        div.innerHTML = "<p>Nenhuma avaliação ainda.</p>"
        return
      }

      const listaAval = document.createElement('ul')

      avaliacoes.forEach(av => {
        const item = document.createElement('li')
        item.textContent = `Nota: ${av.nota} | Comentário: ${av.comentario}`
        listaAval.appendChild(item)
      })

      div.appendChild(listaAval)
    })
    .catch(err => console.error(err))
}



function listarFilmes() {
  fetch('/filmes')
    .then(response => response.json())
    .then(data => {

      lista.innerHTML = "" 

      data.forEach(filme => {
        
        const li = document.createElement('li')

        li.innerHTML = `
          <strong>${filme.nome}</strong> - ${filme.diretor} (${filme.ano}) [${filme.genero}]
        `

        // container onde as avaliações vão aparecer
        const avaliacoesDiv = document.createElement('div')
        avaliacoesDiv.id = `avaliacoes-${filme.id_filmes}`
        avaliacoesDiv.style.marginLeft = "20px"
        avaliacoesDiv.style.marginTop = "5px"

        // botão de avaliações
        const button = document.createElement('button')
        button.textContent = "Avaliações"
        button.addEventListener("click", () => avaliacoesFilme(filme.id_filmes))

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Excluir"
        deleteButton.style.marginLeft = "10px"
        deleteButton.addEventListener("click", () => deletarFilme(filme.id_filmes))

      const form = document.createElement('form')
        form.innerHTML = `
         <input type="number" min="1" max="5" placeholder="Nota (1-5)" required id="nota-${filme.id_filmes}">
         <input type="text" placeholder="Comentário" required id="comentario-${filme.id_filmes}">
         <button type="submit">Enviar Avaliação</button>
         `
         form.style.marginTop = "8px"
         form.style.marginLeft = "20px"
      
         //Adiciona o Event Listener para submissão do formulário
         form.addEventListener("submit", (e) => {
             e.preventDefault(); // Impede o recarregamento da página
             adicionarAvaliacao(filme.id_filmes); // Chama a nova função
             form.reset(); // Limpa os campos do formulário
         })


        li.appendChild(deleteButton)
        li.appendChild(document.createElement("br"))
        li.appendChild(button)
        li.appendChild(avaliacoesDiv)
        li.appendChild(form)
        lista.appendChild(li)

        
      })
    })
    .catch(error => console.error("Erro ao buscar filmes:", error))
}

function adicionarAvaliacao(id_Filmes) {
  // Pega os valores dos inputs específicos para este filme
  const nota = document.getElementById(`nota-${id_Filmes}`).value
  const comentario = document.getElementById(`comentario-${id_Filmes}`).value

  fetch("/avaliacoes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nota: parseInt(nota), // Converte para número inteiro para o banco
      comentario,
      id_filmes: id_Filmes // Nome da coluna na tabela de avaliações (assumindo que seja id_filmes)
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao adicionar avaliação');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message);
      // Opcional: Atualiza a lista de avaliações após o envio bem-sucedido
      avaliacoesFilme(id_Filmes);
      // Limpar o formulário (se necessário, o reset é mais fácil com o event listener)
    })
    .catch(err => console.error("Erro ao enviar avaliação:", err));
}

function deletarFilme(id) {
  if (!confirm("Deseja realmente excluir este filme?")) return;

  fetch(`/filmes/${id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      listarFilmes(); // atualiza lista depois de excluir
    })
    .catch(err => console.error("Erro ao deletar filme:", err));
}


form.addEventListener("submit", async (e) => { //add novo filme
  e.preventDefault();

  const nome = document.getElementById("titulos").value
  const diretor = document.getElementById("diretors").value
  const genero = document.getElementById("generos").value
  const ano = document.getElementById("anos").value


  await fetch("/filmes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({  nome, genero, diretor, ano }), // manda o objeto js para o banco como json
  })

  form.reset(); // limpa os campos com a função nativa para tags form
  listarFilmes(); // atualiza lista
})
window.onload = listarFilmes;

