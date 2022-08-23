const indexController = {};

const Public = require("../models/Publicaciones");
const Event = require("../models/Eventos");
const mongoosePaginate = require("mongoose-paginate-v2");
const e = require("connect-flash");

indexController.renderIndex = async (req, res) => {
  const public = await Public.find();
  const event = await Event.find();

  // ultimas 3 publicaciones en descendente:
  const publicUlt1 = public[public.length - 1];
  const publicUlt2 = public[public.length - 2];
  const publicUlt3 = public[public.length - 3];
  const public2 = [publicUlt1, publicUlt2, publicUlt3];

  // ULTIMAS 4 PUBLICACIONES:
  const ultimasPublicI = await Public.paginate(
    {},
    { page: 1, limit: 4, sort: { createdAt: -1 } }
  );

  const ultimasPublic = ultimasPublicI.docs;


  // Ultimos 3 eventos para mostrar en inicio:
  const primero = event[event.length - 1];
  const segundo = event[event.length - 2];
  const tercero = event[event.length - 3];
  const ultimos3 = [primero, segundo, tercero];

  const novedades = [primero, publicUlt1, segundo, publicUlt2];

  // Funcion para expirar los eventos ya realizados...
  const updateExpirados = async function () {
    const eventI = await Event.find({ vigente: true });
    for (let index = 0; index < eventI.length; index++) {
      var fechaHoy = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );

      if (fechaHoy > eventI[index].fecha) {
        console.log("la fecha es anterior...");
        await Event.findByIdAndUpdate(eventI[index]._id, {
          vigente: false,
        });
      }
    }
  };

  updateExpirados();

  // proximos eventos:
  const proximosEventosI = await Event.paginate(
    { vigente: true },
    { page: 1, limit: 3, sort: { fecha: 1 } }
  );

  const proximosEventos = proximosEventosI.docs;

  res.render("index", {
    public,
    public2,
    ultimos3,
    novedades,
    ultimasPublic,
    proximosEventos,
  });
};

indexController.renderAbout = (req, res) => {
  res.render("nosotros");
};

module.exports = indexController;
