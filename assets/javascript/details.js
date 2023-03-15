// Filtro de eventos por su nombre
const nombreEventos = data.events.filter(eventos => eventos.name) 
console.log(nombreEventos)
  

// Objeto para cada evento con la info que necesito.

const infoEvento = nombreEventos.map(eventos => {
   let deta = {}
   deta._id = eventos._id
   deta.image = eventos.image
   deta.name = eventos.name
   deta.category = eventos.category
   deta.price = eventos.price
   deta.description = eventos.description
   deta.capacity = eventos.capacity
   deta.place = eventos.place
   return deta
})

//console.log(infoEvento)



// Empiezo a separarlos segun su ID

//almacenamos en una variable la cadena de consulta 
const queryString = location.search

const id = new URLSearchParams(queryString).get("id")

console.log(id)

//Buscar el objeto de correspondiente al "id" y lo almaceno en una variable
const evento = infoEvento.find(data => data.name === id) 

console.log(evento)

const containerCards = document.getElementById("cardDetails") 

console.log(containerCards)


cardDetails.innerHTML = ` 
    <div id="card-Details">
        <img src="${evento.image}" class="card-img-top" alt="Imagen de evento">
        <div class="col-12">
            <h5 class="card-tit">Name: ${evento.name}</h5>
            <div class="card-subt row">
                <p class="card-text col-4">Category: ${evento.category}</p>
                <p class="card-text col-4">Date: ${evento.date}</p>
                <p class="card-text col-4">Price: ${evento.price}<small class="text-muted fw-light">/usd</small></p>
            </div>
            <p class="card-text">Description: ${evento.description}</p>
            <div class="card-end row">
                <p class="card-text col-6">Capacity: ${evento.capacity}</p>
                <p class="card-text col-6">Place: ${evento.place}</p>
            </div>
    </div> 
`
