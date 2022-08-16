const ayudController = {};

const Ayud = require("../models/Ayudantes");
const Invest = require('../models/Investigadores');
const { randomName } = require('../helpers/libs');

ayudController.renderAyud = async (req, res) => {
  const ayud = await Ayud.find();
  res.render("equipo/ayudantes", { ayud });
};

ayudController.renderAdminAyud = async (req, res) => {
  const ayud = await Ayud.find();
  res.render("admin/equipo/admin-ayud", { ayud });
};

ayudController.renderAyudForm = async (req, res) => {
  const invest = await Invest.find();
  res.render("admin/equipo/nuevo-ayud", { invest });
};

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

ayudController.renderEditAyud = async (req, res) => {
  const ayud = await Ayud.findById(req.params.id);
  const invest = await Invest.find();
  res.render("admin/equipo/edit-ayud", { ayud, invest });
};

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

ayudController.deleteAyud = async (req, res) => {
  await Ayud.findByIdAndDelete(req.params.id);
  res.redirect("/admin/ayudantes");
}

module.exports = ayudController;
