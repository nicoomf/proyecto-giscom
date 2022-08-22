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

var inputFecha = document.querySelector("#fecha");
inputFecha.setAttribute("min", fechaFormat);