const investController = {}

const Invest = require('../models/Investigadores')
const { randomName } = require('../helpers/libs')

// RENDERIZA LOS INVESTIGADORES EN LA PAGINA GENERAL:
investController.renderInvest = async (req, res) => {
  const invest = await Invest.find()
  res.render('equipo/investigadores', { invest })
}

// RENDERIZA LA LISTA DE INVESTIGADORES EN EL PANEL DE ADMINISTRACION:
investController.renderAdminInvest = async (req, res) => {
  const invest = await Invest.find()
  res.render('admin/equipo/admin-invest', { invest })
}

// RENDERIZA EL FORMULARIO PARA CREAR INVESTIGADORES:
investController.renderInvestForm = async (req, res) => {
  res.render('admin/equipo/nuevo-invest')
}

// CREA Y GUARDA EL INVESTIGADOR EN LA BASE DE DATOS:
investController.createInvest = async (req, res) => {
  try {
    const {
      nombre,
      departamento,
      titulos,
      areas,
      email,
      numero,
      imgUrl,
    } = req.body
    const idmodal = randomName()
    const newInvest = new Invest({
      nombre,
      departamento,
      titulos,
      areas,
      email,
      numero,
      imgUrl,
      idmodal,
    })

    // console.log(newInvest);

    await newInvest.save()
    res.send({ mensaje: 'ok' })
  } catch (error) {
    res.send({ mensaje: error })
  }
}

// RENDERIZA EL FORMULARIO PARA EDITAR EL INVESTIGADOR:
investController.renderEditInvest = async (req, res) => {
  const invest = await Invest.findById(req.params.id)
  res.render('admin/equipo/edit-invest', { invest })
}

// GUARDA LOS CAMBIOS DEL INVESTIGADOR:
investController.updateInvest = async (req, res) => {
  const {
    nombre,
    departamento,
    titulos,
    areas,
    email,
    numero,
    imgUrl,
  } = req.body
  await Invest.findByIdAndUpdate(req.params.id, {
    nombre,
    departamento,
    titulos,
    areas,
    email,
    numero,
    imgUrl,
  })
  res.redirect('/admin/investigadores')
}

// ELIMINA UN INVESTIGADOR:
investController.deleteInvest = async (req, res) => {
  await Invest.findByIdAndDelete(req.params.id)
  res.redirect('/admin/investigadores')
}

module.exports = investController
