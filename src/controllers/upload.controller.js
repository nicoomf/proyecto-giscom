// const Image = require("../models/Image");
// const Archivo = require('../models/Archivo');
const path = require("path");
const fs = require("fs-extra");
const { randomNameArchivo } = require("../helpers/libs");

uploadController = {};

uploadController.renderUpload = async (req, res) => {
  // const imagenes = await Image.find();
  res.render("admin/general/subirImg");
};

uploadController.saveUpload = async (req, res) => {
  console.log(req.file);
  console.log("Subido Correctamente!");
  res.send('Subido!')
}

// uploadController.saveUpload = async (req, res) => {
//   const archivoTitulo = randomNameArchivo();

//   const ext = path.extname(req.file.originalname).toLocaleLowerCase();
//   const archivoTempPath = req.file.path;
//   const targetPath = path.resolve(`src/public/uploads/${archivoTitulo}${ext}`);

//   if (
//     ext === ".png" ||
//     ext === ".jpg" ||
//     ext === ".jpeg" ||
//     ext === ".pdf" ||
//     ext === ".docx"
//   ) {
//     await fs.rename(archivoTempPath, targetPath);
//     const archivo = new Archivo({
//       filename: archivoTitulo + ext
//     });

//     await archivo.save();
//     console.log(archivo);
//     res.status(200);
//     // res.redirect("/admin/subir-imagen");
//   } else {
//     await fs.unlink(archivoTempPath);
//     res.status(500);
//   }
// };

module.exports = uploadController;
