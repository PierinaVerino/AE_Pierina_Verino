
const divCards = document.getElementById('past-card');


function mostrarCards(eventos) {  
  let cards = ''
  for(evento of eventos) {
  cards += 
  `<div class="card h-75 ">
    <img src="${evento.image}" class="card-img-top" alt="Imagen de evento">
    <div class="card-body">
    <h5 class="card-title">${evento.name}</h5>
    <p class="card-text">${evento.description}</p>
    <p class="card-text">${evento.date}</p>
    </div>
    <div class="card-footer d-flex justify-content-evenly">
    <h1 class="card-title pricing-card-title fs-s-5">${evento.price}<small class="text-muted fw-light">/usd</small></h1>
    <a href="./details.html" class="btn btn-outline-dark m-2">Detail</a>
    </div>
  </div>`
} 
divCards.innerHTML = cards;
}


function filtrarPasados(eventos, fechaHoy){
  let eventosPasados= []
  for (i=0; i< eventos.length ; i++) {
    if(eventos[i].date<fechaHoy){
      eventosPasados.push(eventos[i])
    }
  }
  console.log(eventosPasados);  
  return eventosPasados
}


mostrarCards(filtrarPasados(data.events,data.currentDate))
