
// Funcion para CHECKBOX //

const contenedordeChecks = document.getElementById('contenedor-check');

function mostrarChecks(eventos) {
  let arrayCategory = eventos.map(evento => evento.category)
  let setCategory = new Set(arrayCategory)
  let arrayChecks = Array.from(setCategory)
  let categorycheck = ''
  arrayChecks.forEach(category => {
    categorycheck += `
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
        <label class="form-check-label" for="${category}">${category}</label>
      </div>`
  })
  contenedordeChecks.innerHTML = categorycheck
}

mostrarChecks(data.events)  //Esta es la funcion que crear los CHECKBOXES //



//Funcion para el BUSCADOR y filtrado de busquedas //

const input = document.querySelector('input');

input.addEventListener('input',totalFiltros)

contenedordeChecks.addEventListener('change',totalFiltros)

function totalFiltros(){
  let filtroBuscador = filtrarBuscador(data.events,input.value)
  let filtroCheck = filtrarPorChecks(filtroBuscador)
  mostrarCards(filtroCheck)
}



//Funcion para crear las CARDS //

const divCards = document.getElementById('cards');

function mostrarCards(eventos) {  
  if(eventos.length == 0){
    divCards.innerHTML = `<h5 class="display-4"> There is no event with these characteristics </h5>`
    return
  }
  let cards = ''
  for(let evento of eventos) {
  cards += 
  `<div class="card h-80 ">
    <img src="${evento.image}" class="card-img-top" alt="Imagen de evento">
    <div class="card-body">
    <h5 class="card-title">${evento.name}</h5>
    <p class="card-text">${evento.description}</p>
    <p class="card-text">${evento.date}</p>
    </div>
    <div class="card-footer d-flex justify-content-evenly">
    <h1 class="card-title pricing-card-title fs-s-5">${evento.price}<small class="text-muted fw-light">/usd</small></h1>
    <a href="./details.html?id=${evento.name}" class="btn btn-outline-dark m-2">Detail</a>
    </div>
  </div>`
} 
divCards.innerHTML = cards;
}
       
mostrarCards(data.events)  //Esta es la funcion que crear las CARDS //



//Funcion para Filtrar //

function filtrarBuscador(eventos,texto){
  let arrayFiltro = eventos.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltro;
}

function filtrarPorChecks(eventos){
  let todoscheck = document.querySelectorAll("input[type='checkbox']")
  let soloArrayCheck = Array.from(todoscheck)
  let arrayCheckeados = soloArrayCheck.filter(check => check.checked)
  let arrayCheckeadosValues = arrayCheckeados.map(checkChecked => checkChecked.value)
  let arrayFiltro = eventos.filter(evento => arrayCheckeadosValues.includes(evento.category))
  if(arrayCheckeados.length > 0){
      return arrayFiltro
  }
  return eventos
}

