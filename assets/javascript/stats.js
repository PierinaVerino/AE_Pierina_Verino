
let obtenerDatos;

const obtenerBaseDatos = async () => {
  const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
  obtenerDatos = await respuesta.json()

  //console.log(obtenerDatos);

  //console.log(asistenciaMayorTabla(obtenerDatos))

  mostrarMayorAsist(asistenciaMayorTabla(obtenerDatos.events));
  mostrarMenorAsist(asistenciaMenorTabla(obtenerDatos.events));
  mostrarMayorCap(capacidadMayor(obtenerDatos.events));

  mostrarDatosStatUpc(datosStats(filtrarFuturos(obtenerDatos.events, obtenerDatos.currentDate)));

  mostrarDatosStatPas(datosStats(filtrarPasados(obtenerDatos.events, obtenerDatos.currentDate)));
}

obtenerBaseDatos()


//Funcion para filtrar mayor asistencia ----------------------------------------------------------------------------

function asistenciaMayorTabla(array) {
  let arrayMayorasis = array[0]
  for (let i = 1; i < array.length; i++) {
    if (((array[i].assistance * 100) / array[i].capacity) > ((arrayMayorasis.assistance * 100) / arrayMayorasis.capacity)) {
      arrayMayorasis = array[i]
    }
  }
  let porcentajAsistMayor = ((arrayMayorasis.assistance * 100) / arrayMayorasis.capacity).toFixed(2)

  return { name: arrayMayorasis.name, porcentajAsistMayor }
}

const divAsistMayor = document.getElementById('mayorAsist');

function mostrarMayorAsist(eventos) {
  let mayorAsist = ''
  mayorAsist +=
    `<div>
    <p class="card-text">${eventos.name}</p>
    <p class="card-text">${eventos.porcentajAsistMayor}%</p>
  </div>`
  divAsistMayor.innerHTML = mayorAsist;
}

//Funcion para filtrar menor asistencia ----------------------------------------------------------------------------

function asistenciaMenorTabla(array) {
  let arrayMenorasis = array[0]
  for (let i = 1; i < array.length; i++) {
    if (((array[i].assistance * 100) / array[i].capacity) < ((arrayMenorasis.assistance * 100) / arrayMenorasis.capacity)) {
      arrayMenorasis = array[i]
    }
  }
  let porcentajAsistMenor = ((arrayMenorasis.assistance * 100) / arrayMenorasis.capacity)

  return { name: arrayMenorasis.name, porcentajAsistMenor }
}

const divAsistMenor = document.getElementById('menorAsist');

function mostrarMenorAsist(eventos) {
  let menorAsist = ''
  menorAsist +=
    `<div>
    <p class="card-text">${eventos.name}</p>
    <p class="card-text">${eventos.porcentajAsistMenor}%</p>
  </div>`
  divAsistMenor.innerHTML = menorAsist;
}

//Funcion para filtrar capacity ---------------------------------------------------------------------------- 

function capacidadMayor(array) {
  let arrayMayorcap = array[0]
  for (let i = 1; i < array.length; i++) {
    if (array[i].capacity > arrayMayorcap.capacity) { arrayMayorcap = array[i] }
  }
  return arrayMayorcap
}

const divMayorcap = document.getElementById('mayorCap');

function mostrarMayorCap(eventos) {
  let mayorCap = ''
  mayorCap +=
    `<div>
    <p class="card-text">${eventos.name}</p>
    <p class="card-text">${eventos.capacity}</p>
  </div>`
  divMayorcap.innerHTML = mayorCap;
  //console.log(eventos)
}


//Funcion para filtrar eventos Futuros ------------------------------------------------------------------------------

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

//Funcion para filtrar eventos Pasados ------------------------------------------------------------------------------

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

//Funcion para recorrer los eventos, calcular asistencia y precio
// Guardar esa info en Arrays y acomodarlos de mayor a menor ------------------------------------------------------------------------------

function datosStats(eventos) {
  let arrayCatTotal = eventos.map(evento => evento.category)
  let setCateTot = new Set(arrayCatTotal)
  let arrayCatTot = Array.from(setCateTot)
  let categdeEventos = arrayCatTot.map(cat => eventos.filter(eventos => eventos.category == cat))
  let result = categdeEventos.map(eventosCategory => {
    let datosTabla = eventosCategory.reduce((acc, eventos) => {
      console.log(eventos)
      acc.category = eventos.category;
      acc.revenues += eventos.price * (eventos.assistance || eventos.estimate);
      acc.attendance += ((eventos.assistance || eventos.estimate) * 100) / eventos.capacity
      return acc
    }, {
      category: "",
      revenues: 0,
      attendance: 0,
    })
    datosTabla.attendance = datosTabla.attendance / eventosCategory.length
    return datosTabla
  })
  return result;
}


const tablaStatsU = document.getElementById("cateUpdate")

function mostrarDatosStatUpc(eventos) {
  let datos = eventos.map(evento => {
    return `
      <tr>
        <td>${evento.category}</td>
        <td>$${evento.revenues}</td>
        <td>${evento.attendance.toFixed(2)}%</td>
      </tr>
      `
  })
  tablaStatsU.innerHTML = datos.join("")
}




const tablaStatsP = document.getElementById("catePast")

function mostrarDatosStatPas(eventos) {
  let datos = eventos.map(evento => {
    return `
      <tr>
          <td>${evento.category}</td>
          <td>$${evento.revenues}</td>
          <td>${evento.attendance.toFixed(2)}%</td>
        </tr>
      `
  })
  tablaStatsP.innerHTML = datos.join("")
}

