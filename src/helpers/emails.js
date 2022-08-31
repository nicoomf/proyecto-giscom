const emails = {};

const sgMail = require("@sendgrid/mail");

const apikey =
  "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";


//   TEMPLATES PARA CORREOS CON HTML:
const templateGeneral = ``;
const templateEvent = ``;

emails.sendMail = async (correo) => {
  sgMail.setApiKey(apikey);

  const msg = {
    to: `${correo}`,
    from: "Grupo de Investigacion gISCOM <giscom-app@outlook.com>",
    subject: "¡Bienvenido a la familia Giscom!",
    html: "<h1>Gracias por suscribirte! Ahora recibiras notificaciones de las actividades que realizamos en nuestro sitio web!</h1>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Correo enviado: %s", msg);
    })
    .catch((error) => {
      console.error(error);
    });
};

emails.sendMailEvent = async (correo, nombre, apellido, evento) => {
  sgMail.setApiKey(apikey);

  const msg = {
    to: `${correo}`,
    from: "Grupo de Investigacion gISCOM <giscom-app@outlook.com>",
    subject: `¡Hola ${nombre} ${apellido}! Te has Suscrito...`,
    html: `<h1>¡${nombre}!</h1><br><br><h3>Te has suscrito correctamente al evento:<br>${evento}</h3>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Correo enviado: %s", msg);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = emails;
