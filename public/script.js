function buscarFilme() {
  const id = document.getElementById("idFilme").value;

  fetch(`/filmes/${id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      document.getElementById("titulo").innerHTML = data.nome
      document.getElementById("diretor").innerHTML = data.diretor
      document.getElementById("ano").innerHTML = data.ano
      document.getElementById("genero").innerHTML = data.genero
    })
    .catch(error => {
      console.error(error);
    });
}
