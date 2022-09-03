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
// console.log(dia);

var fechaFormat = `${fechaMinima.getFullYear()}-${
  meses[fechaMinima.getMonth()]
}-${dia}`;

// console.log(fechaMinima);
// console.log(fechaFormat);

var inputFecha = document.querySelector("#fecha");
inputFecha.setAttribute("min", fechaFormat);