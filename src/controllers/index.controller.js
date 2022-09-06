const indexController = {};

const Public = require("../models/Publicaciones");
const Event = require("../models/Eventos");
const mongoosePaginate = require("mongoose-paginate-v2");

indexController.renderIndex = async (req, res) => {

  (async () => {
    const eventI = await Event.find({ vigente: true });
    for (let index = 0; index < eventI.length; index++) {
      const horaEvent = eventI[index].hora;
      const hora = horaEvent.split(":");
      var fechaHoy = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        hora[0],
        hora[1]
      );

      if (fechaHoy >= eventI[index].fecha) {
        await Event.findByIdAndUpdate(eventI[index]._id, {
          vigente: false,
        });
      }
    }
  })();

  const public = await Public.find();
  const event = await Event.find();

  // ULTIMAS 4 PUBLICACIONES:
  const ultimasPublicI = await Public.paginate(
    {},
    { page: 1, limit: 4, sort: { createdAt: -1 } }
  );

  const ultimasPublic = ultimasPublicI.docs;

  // Ultimos 3 eventos para mostrar en Novedades:
  const primero = event[event.length - 1];
  const segundo = event[event.length - 2];

  // ultimas 3 publicaciones en descendente:
  const publicUlt1 = public[public.length - 1];
  const publicUlt2 = public[public.length - 2];

  const novedades = [primero, publicUlt1, segundo, publicUlt2];

  // proximos eventos:
  const proximosEventosI = await Event.paginate(
    { vigente: true },
    { page: 1, limit: 3, sort: { fecha: 1 } }
  );

  const proximosEventos = proximosEventosI.docs;

  res.render("index", {
    novedades,
    ultimasPublic,
    proximosEventos,
  });
};

indexController.renderAbout = (req, res) => {
  res.render("nosotros");
};

module.exports = indexController;
