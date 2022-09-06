const helpers = {};

const Event = require("../models/Eventos");

// AUTENTICA LOS USUARIOS:
helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash(
    "error_msg",
    "No estas autorizado! Inicia sesión para continuar..."
  );
  res.redirect("/admin/signin");
};

// Updatea constantemente los eventos expirados... *OPCION 2 (ACTUALMENTE NO SE USA)*
helpers.updateExpirados = async (req, res, next) => {
  const eventI = await Event.find({ vigente: true });
  // console.log("entro!");
  // console.log(eventI);
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
      // console.log("Updateado!");
    }
    //   res.send("Updateado...");
  }
  // console.log(fechaHoy);
  return next();
};

module.exports = helpers;
