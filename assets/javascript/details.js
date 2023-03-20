
// Tomar datos de JSON //

let obtenerDatos;

const obtenerBaseDatos = async ()=> {
  const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
  obtenerDatos = await respuesta.json()
  console.log(obtenerDatos);

  
  nombreEventos = obtenerDatos.events.filter(eventos => eventos.name) // Filtro de eventos por su nombre
  console.log(nombreEventos);


  infoEvento = nombreEventos.map(eventos => {
    let deta = {}
    deta._id = eventos._id
    deta.image = eventos.image
    deta.name = eventos.name
    deta.category = eventos.category
    deta.price = eventos.price
    deta.description = eventos.description
    deta.capacity = eventos.capacity
    deta.place = eventos.place
    return deta})                                       // Objeto para cada evento con la info que necesito.

    console.log(infoEvento);

    queryString = location.search                      // Empiezo a separarlos segun su ID - almacenamos en una variable la cadena de consulta 
    id = new URLSearchParams(queryString).get("id");
    console.log(id);


    evento = infoEvento.find(obtenerDatos => obtenerDatos.name === id)  //Buscar el objeto de correspondiente al "id" y lo almaceno en una variable
    console.log(evento);

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
    containerCards = document.getElementById("cardDetails") 
    console.log(containerCards);

}

obtenerBaseDatos()

