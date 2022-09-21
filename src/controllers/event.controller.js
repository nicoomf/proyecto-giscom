const eventController = {};

const Event = require("../models/Eventos");
const Subs = require("../models/Subs");
const { randomName, randomUrl } = require("../helpers/libs");
const { format } = require("date-fns");
const mongoosePaginate = require("mongoose-paginate-v2");
const emailer = require("../helpers/emails");

// RENDERIZA LOS EVENTOS EN LA PAGINA PRINCIPAL:
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

// RENDERIZA LA PAGINA DE UN EVENTO:
eventController.renderEvento = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render("actividades/evento", { event });
};

// RENDERIZA LA LISTA DE EVENTOS EN EL PANEL DE ADMINISTRACION:
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

// RENDERIZA EL FORMULARIO PARA CREAR UN NUEVO EVENTO:
eventController.renderNuevoEvento = (req, res) => {
  res.render("admin/actividades/nuevo-evento");
};

// GUARDA EL NUEVO EVENTO EN LA BASE DE DATOS:
eventController.createEvento = async (req, res) => {
  try {
    const saveEvent = async () => {
      const eventUrl = randomUrl();
      const urls = await Event.find({ url: eventUrl });
      const correosI = await Subs.find();

      var correos = ``;
      for (let i = 0; i < correosI.length; i++) {
        const correo = correosI[i].email;
        if (correos == "") {
          correos = `${correo}`;
        } else {
          correos = `${correos}, ${correo}`;
        }
      }

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
        emailer.sendMailNewEvent(correos, titulo, fechaFormat, hora);
        res.send({ mensaje: "ok" });
      }
    };

    saveEvent();
  } catch (error) {
    res.send({ mensaje: error });
  }
};

// RENDERIZA EL FORMULARIO PARA EDITAR UN EVENTO:
eventController.renderEditEvento = async (req, res) => {
  const event = await Event.findById(req.params.id);
  fechaFormat = event.fechaFormat;
  var aux = fechaFormat.split("/");
  fechaG = `${aux[2]}-${aux[1]}-${aux[0]}`;
  res.render("admin/actividades/edit-evento", { event, fechaG });
};

// ACTUALIZA LOS CAMBIOS DEL EVENTO EN LA BASE DE DATOS:
eventController.updateEvent = async (req, res) => {
  const { titulo, descripcion, fecha, hora, breveDescrip, fechaG, horaG } =
    req.body;

  const id = req.params.id;

  const evento = await Event.findById(id).exec();
  const subsEvent = evento.subs;

  var correos = ``;
  for (let i = 0; i < subsEvent.length; i++) {
    const correo = subsEvent[i].email;
    if (correos == "") {
      correos = `${correo}`;
    } else {
      correos = `${correos}, ${correo}`;
    }
  }

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

    if (fechaFormat != fechaG || hora != horaG) {
      console.log(
        "La fecha es distinta! fechaFormat es: %s / y fechaG es: %s",
        fechaFormat,
        fechaG
      );
      console.log(
        "La Hora es distinta! hora es: %s / y la horaG es: %s",
        hora,
        horaG
      );

      if (correos != "") {
        emailer.sendMailUpdateEvent(correos, titulo, fecha, hora, id);
      }
    }

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

// ELIMINA UN EVENTO:
eventController.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.redirect("/admin/eventos");
};

// ENVIA UN EMAIL A LOS SUSCRIPTORES DEL EVENTO:
eventController.sendMailSubs = async (req, res) => {
  const { id, mensaje } = req.body;

  const evento = await Event.findById(id).exec();
  const subsEvent = evento.subs;
  const titulo = evento.titulo;

  var correos = ``;

  for (let i = 0; i < subsEvent.length; i++) {
    const correo = subsEvent[i].email;
    if (correos == "") {
      correos = `${correo}`;
    } else {
      correos = `${correos}, ${correo}`;
    }
  }

  if (correos != "") {
    emailer.sendMailForSubs(correos, mensaje, titulo);
  }
};

// ENVIA UN RECORDATORIO AUTOMATICAMENTE POR EMAIL CUANDO QUEDA MENOS DE UN DIA PARA EL EVENTO:
eventController.sendMailReminder = async (req, res) => {
  const evento = await Event.find({ vigente: "true" });

  for (let i = 0; i < evento.length; i++) {
    const horaEvent = evento[i].hora;
    const hora = horaEvent.split(":");
    var fechaHoy = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      hora[0],
      hora[1]
    );

    const fechaEvento = evento[i].fecha;

    let milisegundos = 24 * 60 * 60 * 1000;
    let miliSegTrans = Math.abs(fechaHoy.getTime() - fechaEvento.getTime());

    var diasFaltantes = Math.round(miliSegTrans / milisegundos);

    if (diasFaltantes <= 1) {
      const subsEvent = evento[i].subs;
      const titulo = evento[i].titulo;

      if (evento[i].recordatorio == false) {
        if (subsEvent) {
          var correos = ``;

          for (let i = 0; i < subsEvent.length; i++) {
            const correo = subsEvent[i].email;
            if (correos == "") {
              correos = `${correo}`;
            } else {
              correos = `${correos}, ${correo}`;
            }
          }

          let id = evento[i].id;
          let fecha = evento[i].fechaFormat;
          let hora = evento[i].hora;

          emailer.sendMailReminder(correos, titulo, id, fecha, hora);

          await Event.findByIdAndUpdate(id, {
            recordatorio: true,
          });
        }
      }
    }
  }
};

module.exports = eventController;
