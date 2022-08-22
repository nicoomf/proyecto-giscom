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

var fechaFormat = `${fechaMinima.getFullYear()}-${
  meses[fechaMinima.getMonth()]
}-${fechaMinima.getDate()}`;

var fechaG = document.getElementById("fecha");
fechaG = fechaG.value;

var fechaH = `${new Date().getFullYear()}-${
  meses[new Date().getMonth()]
}-${new Date().getDate()}`;

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
