const helpers = {};

const Event = require("../models/Eventos");

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'No estas autorizado! Inicia sesión para continuar...');
    res.redirect('/admin/signin');
};

// Updatea constantemente los eventos expirados...
helpers.updateExpirados = async (req, res, next) => {
    const eventI = await Event.find({ vigente: true });
    console.log("entro!");
    // console.log(eventI);
    for (let index = 0; index < eventI.length; index++) {
      var fechaHoy = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        00,
        00
      );
      console.log(fechaHoy);
  
      if (fechaHoy >= eventI[index].fecha) {
        await Event.findByIdAndUpdate(eventI[index]._id, {
          vigente: false,
        });
        console.log("Updateado!");
      }
  
    //   res.send("Updateado...");
    }
    return next();
  }

module.exports = helpers;