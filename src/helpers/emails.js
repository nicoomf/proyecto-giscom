const emails = {};

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

require("dotenv").config();
// console.log(process.env);

const templateInicio = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
 <head> 
  <meta charset="UTF-8"> 
  <meta content="width=device-width, initial-scale=1" name="viewport"> 
  <meta name="x-apple-disable-message-reformatting"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta content="telephone=no" name="format-detection"> 
  <title>Nueva plantilla de correo electrC3B3nico 2022-09-01</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--> 
  <style type="text/css">
#outlook a {
	padding:0;
}
.ExternalClass {
	width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
	line-height:100%;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
[data-ogsb] .es-button {
	border-width:0!important;
	padding:15px 30px 15px 30px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:32px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:32px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } .h-auto { height:auto!important } }
</style> 
 </head> 
 <body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;padding:0;Margin:0"> 
  <div class="es-wrapper-color" style="background-color:#EEEEEE"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#eeeeee"></v:fill>
			</v:background>
		<![endif]--> 
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
     <tr style="border-collapse:collapse"> 
      <td valign="top" style="padding:0;Margin:0"> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"></tr> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-left:35px;padding-right:35px;background-color:#ffffff"><!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:428px" valign="top"><![endif]--> 
               <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="es-m-p20b" align="center" valign="top" style="padding:0;Margin:0;width:428px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;padding-top:35px;padding-bottom:35px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;color:#135dad"><br>Industria Inteligente y Sistemas Complejos</h4><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#135dad;font-size:14px">Grupo de Investigación - Universidad del Bío-Bío</p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table><!--[if mso]></td><td style="width:0px"></td><td style="width:102px" valign="top"><![endif]--> 
               <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;width:102px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;padding-bottom:15px;padding-top:25px;font-size:0px"><img src="https://jzxicz.stripocdn.email/content/guids/6d396c46-b3ea-497f-88d6-38a46c63eb12/images/giscom_favicon.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="102"></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table><!--[if mso]></td></tr></table><![endif]--></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" bgcolor="#0b5394" style="Margin:0;padding-left:35px;padding-right:35px;padding-top:40px;padding-bottom:40px;background-color:#0b5394"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td valign="top" align="center" style="padding:0;Margin:0;width:530px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-txt-l" align="center" style="padding:0;Margin:0;padding-top:15px">`;

const templateFinal = `</td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table> 
<table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
<tr style="border-collapse:collapse"> 
<td align="center" style="padding:0;Margin:0"> 
<table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
<tr style="border-collapse:collapse"> 
<td align="left" style="padding:35px;Margin:0"><!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:255px" valign="top"><![endif]--> 
<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
<tr style="border-collapse:collapse"> 
<td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:255px"> 
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr style="border-collapse:collapse"> 
 <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.ubiobio.cl/w/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px"><img class="adapt-img" src="https://jzxicz.stripocdn.email/content/guids/6d396c46-b3ea-497f-88d6-38a46c63eb12/images/isoc.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="255"></a></td> 
</tr> 
</table></td> 
</tr> 
</table><!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]--> 
<table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
<tr style="border-collapse:collapse"> 
<td align="left" style="padding:0;Margin:0;width:255px"> 
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr style="border-collapse:collapse"> 
 <td align="right" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://giscom.herokuapp.com/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px"><img class="adapt-img" src="https://jzxicz.stripocdn.email/content/guids/6d396c46-b3ea-497f-88d6-38a46c63eb12/images/giscom_logov2.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="235"></a></td> 
</tr> 
</table></td> 
</tr> 
</table><!--[if mso]></td></tr></table><![endif]--></td> 
</tr> 
</table></td> 
</tr> 
</table> 
<table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
<tr style="border-collapse:collapse"> 
<td align="center" style="padding:0;Margin:0"> 
<table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#0b5394;width:600px;border-bottom:10px solid #135dad" cellspacing="0" cellpadding="0" bgcolor="#0b5394" align="center"> 
<tr style="border-collapse:collapse"> 
<td align="left" style="padding:0;Margin:0"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr style="border-collapse:collapse"> 
<td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr style="border-collapse:collapse"> 
 <td esdev-links-color="#777777" align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:25px;padding-bottom:25px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:23px;color:#ffffff;font-size:15px">© Copyright 2022 gISCOM</p></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table> 
</div>  
</body>
</html>`;

const oauth2Client = new OAuth2(
  process.env.SM_CLIENTID,
  process.env.SM_CLIENTSECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.SM_REFRESHTOKEN,
});

const createTrans = async () => {
  const accessToken = await oauth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: process.env.SM_TYPE,
      user: process.env.SM_USER,
      clientId: process.env.SM_CLIENTID,
      clientSecret: process.env.SM_CLIENTSECRET,
      refreshToken: process.env.SM_REFRESHTOKEN,
      accessToken: accessToken,
    },
  });

  return transport;
};

emails.sendMail = async (correo) => {
  // Titulo para el mensaje del email
  const titulo = `¡Hola!`;
  //   Mensaje del email
  const mensaje = `Muchas gracias por suscribirte...<br><br>Ahora te notificaremos cada vez que nuestros investigadores publiquen o realicen una actividad dentro del sitio web!`;
  const cuerpo = `<div><h2 style="color: #fff;">${titulo}</h2><p style="color: #fff;">${mensaje}</p></div>`;

  const transporter = createTrans();
  const info = (await transporter).sendMail({
    from: "Grupo de Investigacion gISCOM <giscom-app@outlook.com>",
    to: `${correo}`,
    subject: "¡Bienvenido a Giscom!",
    html: `${templateInicio} ${cuerpo} ${templateFinal}`,
  });

  console.log("Correo enviado!");

  return;
};

emails.sendMailEvent = async (correo, nombre, apellido, evento) => {
  // Titulo para el mensaje del email
  const titulo = `¡Te Suscribiste!`;
  //   Mensaje del email
  const mensaje = `${nombre}!, te informamos que te acabas de suscribir al Evento: <br><br>"${evento}"<br><br>¡Por lo que te recordaremos cuando se acerque la fecha de realización!`;
  const cuerpo = `<div><h2 style="color: #fff;">${titulo}</h2><p style="color: #fff;">${mensaje}</p></div>`;

  const transporter = createTrans();
  const info = (await transporter).sendMail({
    from: "Grupo de Investigacion gISCOM <giscom-app@outlook.com>",
    to: `${correo}`,
    subject: `¡Hola ${nombre} ${apellido}!`,
    html: `${templateInicio} ${cuerpo} ${templateFinal}`,
  });
};

emails.sendMailNewPublic = async (correos, categoria, autor) => {
  // Titulo para el mensaje del email
  const titulo2 = `¡Se acaba de publicar una ${categoria}!`;
  //   Mensaje del email
  const mensaje = `Estimad@!, te informamos que <b>${autor}</b> acaba de publicar una <b>${categoria}</b><br><br><a style="color: #fff;" href="https://giscom.herokuapp.com/actividades/publicaciones?categoria=${categoria}">Ir a Giscom</a>`;
  const cuerpo = `<div><h2 style="color: #fff;">${titulo2}</h2><p style="color: #fff;">${mensaje}</p></div>`;

  const transporter = createTrans();
  const info = (await transporter).sendMail({
    from: "Grupo de Investigacion gISCOM <giscom-app@outlook.com>",
    to: `${correos}`,
    subject: `Nueva publicación de ${categoria} en nuestro sitio web!`,
    html: `${templateInicio} ${cuerpo} ${templateFinal}`,
  });
};

emails.sendMailNewEvent = async (correos, titulo, fecha, hora) => {
  // Titulo para el mensaje del email
  const titulo2 = `¡Se acaba de publicar nuevo Evento!`;
  //   Mensaje del email
  const mensaje = `Estimad@!, te informamos que nuestros investigadores han fijado un nuevo <b>Evento</b><br><br>"${titulo}"<br><br>Para el: ${fecha} a las: ${hora}<br><br><a style="color: #fff;" href="https://giscom.herokuapp.com/actividades/eventos">Ir a Giscom</a>`;
  const cuerpo = `<div><h2 style="color: #fff;">${titulo2}</h2><p style="color: #fff;">${mensaje}</p></div>`;

  const transporter = createTrans();
  const info = (await transporter).sendMail({
    from: "Grupo de Investigacion gISCOM <giscom-app@outlook.com>",
    to: `${correos}`,
    subject: `Tenemos nuevo Evento fijado en nuestro sitio web!`,
    html: `${templateInicio} ${cuerpo} ${templateFinal}`,
  });
};

emails.sendMailUpdateEvent = async (correos, titulo, fecha, hora, id) => {
  // Titulo para el mensaje del email
  const titulo2 = `Tuvimos que hacer un cambio...`;
  //   Mensaje del email
  const mensaje = `Estimad@!, te informamos que hemos cambiado la fecha de nuestro Evento:<br><br>"${titulo}"<br><br>Para el: ${fecha} a las: ${hora}<br><br><a style="color: #fff;" href="https://giscom.herokuapp.com/actividades/eventos/${id}">Ir a Giscom</a>`;
  const cuerpo = `<div><h2 style="color: #fff;">${titulo2}</h2><p style="color: #fff;">${mensaje}</p></div>`;

  const transporter = createTrans();
  const info = (await transporter).sendMail({
    from: "Grupo de Investigacion gISCOM <giscom-app@outlook.com>",
    to: `${correos}`,
    subject: `Se cambio la fecha del Evento!`,
    html: `${templateInicio} ${cuerpo} ${templateFinal}`,
  });
};

module.exports = emails;
