const eventController = {};

const Event = require("../models/Eventos");
const Subs = require('../models/Subs');
const { randomName, randomUrl } = require("../helpers/libs");
const { format } = require("date-fns");
const mongoosePaginate = require("mongoose-paginate-v2");
const emailer = require('../helpers/emails');

eventController.renderEventos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const eventI = await Event.paginate(
    {},
    { page, limit: 9, sort: { createdAt: -1 } }
  );
  const totalPages = [];
  for (let index = 0; index < eventI.totalPages; index++) {
    totalPages.push(index + 1);
  }
  const event = eventI.docs;
  const ultPage = eventI.totalPages;
  res.render("actividades/eventos", { event, totalPages, page, ultPage });
};

eventController.renderEvento = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render("actividades/evento", { event });
};

eventController.renderAdminEventos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const eventI = await Event.paginate(
    {},
    { page, limit: 10, sort: { createdAt: -1 } }
  );
  const totalPages = [];
  for (let index = 0; index < eventI.totalPages; index++) {
    totalPages.push(index + 1);
  }
  const event = eventI.docs;
  const ultPage = eventI.totalPages;
  res.render("admin/actividades/admin-eventos", {
    event,
    totalPages,
    page,
    ultPage,
  });
};

eventController.renderNuevoEvento = (req, res) => {
  res.render("admin/actividades/nuevo-evento");
};

eventController.createEvento = async (req, res) => {
  try {
    const saveEvent = async () => {
      const eventUrl = randomUrl();
      const urls = await Event.find({ url: eventUrl });
      const correosI = await Subs.find();
      // console.log(correosI);
      var correos = ``;
      for (let i = 0; i < correosI.length; i++) {
        const correo = correosI[i].email;
        if (correos == "") {
          correos = `${correo}`
        } else {
          correos = `${correos}, ${correo}`
        }
      }
      // console.log(correos);
      if (urls.length > 0) {
        saveEvent();
      } else {
        const { titulo, descripcion, fecha, hora, breveDescrip } = req.body;
        const url = eventUrl;
        const creado = format(new Date(), "dd/MM/yyyy");
        const fechaArray = fecha.split("-");
        const fechaInversa = fechaArray.reverse();
        const fechaFormat = fechaInversa.join("/");

        const newFecha = new Date(fecha);
        const newHora = hora.split(":");
        const fechaHora = new Date(
          newFecha.getFullYear(),
          newFecha.getMonth(),
          newFecha.getDate(),
          newHora[0],
          newHora[1]
        );

        const newEvent = new Event({
          titulo,
          descripcion,
          fecha: fechaHora,
          fechaFormat,
          url,
          creado,
          hora,
          breveDescrip,
        });
        await newEvent.save();
        emailer.sendMailNewEvent(correos,titulo,fechaFormat);
        res.send({ mensaje: "ok" });
      }
    };

    saveEvent();
  } catch (error) {
    res.send({ mensaje: error });
  }
};

eventController.renderEditEvento = async (req, res) => {
  const event = await Event.findById(req.params.id);
  fechaFormat = event.fechaFormat;
  var aux = fechaFormat.split("/");
  fechaG = `${aux[2]}-${aux[1]}-${aux[0]}`;
  res.render("admin/actividades/edit-evento", { event, fechaG });
};

eventController.updateEvent = async (req, res) => {
  const { titulo, descripcion, fecha, hora, breveDescrip } = req.body;

  if (fecha.length !== 0) {
    const fechaArray = fecha.split("-");
    const fechaInversa = fechaArray.reverse();
    const fechaFormat = fechaInversa.join("/");

    const newFecha = new Date(fecha);
    const newHora = hora.split(":");
    const fechaHora = new Date(
      newFecha.getFullYear(),
      newFecha.getMonth(),
      newFecha.getDate(),
      newHora[0],
      newHora[1]
    );

    await Event.findByIdAndUpdate(req.params.id, {
      titulo,
      descripcion,
      fecha: fechaHora,
      fechaFormat,
      hora,
      breveDescrip,
      vigente: true,
    });
    res.redirect("/admin/eventos");
  } else {
    await Event.findByIdAndUpdate(req.params.id, {
      titulo,
      descripcion,
      hora,
    });
    res.redirect("/admin/eventos");
  }
};

eventController.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.redirect("/admin/eventos");
};

module.exports = eventController;
