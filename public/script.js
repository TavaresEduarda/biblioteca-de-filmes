
let form = document.getElementById("addFilme")

function buscarFilme() {
  const id = document.getElementById("idFilme").value
  let url = `/filmes/`

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
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

// function avaliacoesFilme() {
//   let url = `/avaliacoes/` 

//   fetch(url)
//     .then(response => {
//       return response.json();
//     })

//     .then(data => {
//       for(let i = 0; i < data.length; i++){

//         if(data[i].id_avaliacoes){}
//       }
//       console.log(data[i])
//     })
// }

function listarFilmes() { // função para listar filmes na tela
  fetch('/filmes')
    .then(response => response.json())
    .then(data => {
      
      lista.innerHTML = "" // Limpa a lista antes de adicionar novos itens

      data.forEach(filme => {
        const li = document.createElement('li')
        li.textContent = `${filme.nome} - ${filme.diretor} (${filme.ano}) [${filme.genero}]`
         lista.appendChild(li)

         const button = document.createElement('button')
          button.textContent = "Avaliação"
          lista.appendChild(button)
          
       
         
      })
    })
    .catch(error => console.error("Erro ao buscar filmes:", error))
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

