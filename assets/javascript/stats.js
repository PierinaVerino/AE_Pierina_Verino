
let obtenerDatos;

const obtenerBaseDatos = async ()=> {
  const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
  obtenerDatos = await respuesta.json()
  console.log(obtenerDatos);
  filtrarPasados(obtenerDatos.events, obtenerDatos.currentDate);
  filtrarFuturos(obtenerDatos.events, obtenerDatos.currentDate);
}

obtenerBaseDatos()


//Funcion para filtrar eventos pasados

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
  


//Funcion para filtrar eventos futuros

function filtrarFuturos(eventos, fechaHoy){
    let eventosFuturos= []
    for (i=0; i< eventos.length ; i++) {
      if(eventos[i].date > fechaHoy){
        eventosFuturos.push(eventos[i])
      }
    }
    console.log(eventosFuturos);  
    return eventosFuturos
  }
  
  