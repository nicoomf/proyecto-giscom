const ayudController = {};

const Ayud = require("../models/Ayudantes");
const Invest = require('../models/Investigadores');
const { randomName } = require('../helpers/libs');

// RENDERIZA LOS AYUDANTES EN LA PAGINA GENERAL:
ayudController.renderAyud = async (req, res) => {
  const ayud = await Ayud.find();
  res.render("equipo/ayudantes", { ayud });
};

// RENDERIZA LA LISTA DE AYUDANTES EN EL PANEL DE ADMINISTRACION:
ayudController.renderAdminAyud = async (req, res) => {
  const ayud = await Ayud.find();
  res.render("admin/equipo/admin-ayud", { ayud });
};

// RENDERIZA EL FORMULARIO PARA CREAR AYUDANTES:
ayudController.renderAyudForm = async (req, res) => {
  const invest = await Invest.find();
  res.render("admin/equipo/nuevo-ayud", { invest });
};

// CREA EL AYUDANTE EN LA BASE DA DATOS:
ayudController.createAyud = async (req, res) => {
  try {
    const { nombre, carrera, proyecto, profesor, email, imgUrl } = req.body;
    const idmodal = randomName();
    const newAyud = new Ayud({
      nombre,
      carrera,
      proyecto,
      profesor,
      email,
      imgUrl,
      idmodal
    });

    await newAyud.save();
    res.send({ mensaje: "ok" });
    // res.redirect('/admin/ayudantes');
  } catch (error) {
    res.send({ mensaje: error });
  }
};

// RENDERIZA EL FORMULARIO PARA EDITAR UN AYUDANTE:
ayudController.renderEditAyud = async (req, res) => {
  const ayud = await Ayud.findById(req.params.id);
  const invest = await Invest.find();
  res.render("admin/equipo/edit-ayud", { ayud, invest });
};

// GUARDA LOS CAMBIOS DEL AYUDANTE:
ayudController.updateAyud = async (req, res) => {
  const { nombre, carrera, proyecto, profesor, email, imgUrl } = req.body;
  await Ayud.findByIdAndUpdate(req.params.id, {
    nombre,
    carrera,
    proyecto,
    profesor,
    email,
    imgUrl
  });
  res.redirect("/admin/ayudantes");
}

// ELIMINA UN AYUDANTE:
ayudController.deleteAyud = async (req, res) => {
  await Ayud.findByIdAndDelete(req.params.id);
  res.redirect("/admin/ayudantes");
}

module.exports = ayudController;
