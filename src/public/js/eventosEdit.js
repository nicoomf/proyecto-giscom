// Aqui se ingresa la fecha minima que se puede asignar a un evento.

var fechaMinima = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate() + 3
);

let meses = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

var dia = fechaMinima.getDate();
if (dia < 10 ) {
  dia = `0${dia}`;
}

var fechaFormat = `${fechaMinima.getFullYear()}-${
  meses[fechaMinima.getMonth()]
}-${dia}`;

// console.log(fechaFormat);

var fechaG = document.getElementById("fecha");
fechaG = fechaG.value;

var fecha = document.getElementById("fechaGuardada2");
fecha = fecha.value;
// console.log(fecha);
// console.log(fechaMinima);

var fechaH = `${new Date().getFullYear()}-${
  meses[new Date().getMonth()]
}-${new Date().getDate()}`;

var fechaHoy = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
);

if (fechaG > fechaFormat) {
  var inputFecha = document.querySelector("#fecha");
  inputFecha.setAttribute("min", fechaFormat);
} else if (fechaG < fechaH) {
  var inputFecha = document.querySelector("#fecha");
  inputFecha.setAttribute("min", fechaFormat);
} else {
  var inputFecha = document.querySelector("#fecha");
  inputFecha.setAttribute("min", fechaG);
}
