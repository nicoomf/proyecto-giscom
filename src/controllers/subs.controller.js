const subsController = {};

const Subs = require('../models/Subs');
const Event = require('../models/Eventos');

const emailer = require('../helpers/emails');

// GUARDA UN SUSCRIPTOR DE UN EVENTO EN LA BASE DE DATOS:
subsController.addSubs = async (req, res) => {

    const { email, nombre, apellido, id } = req.body;
    const subs = { nombre, apellido, email };

    const aux = await Event.findById(id);
    const evento = aux.titulo;
    const event = await Event.find( { "_id": id ,"subs.email": email } );
    if (event.length !== 0) {        
        console.log("el correo ya existe!");
    } else {
        await Event.findByIdAndUpdate(id, {$push: { 'subs': subs }});
        emailer.sendMailSubEvent(email, nombre, apellido, evento)
        res.sendStatus(200);
    }
};

// GUARDA UN SUSCRIPTOR DE LA PAGINA EN GENERAL EN LA BASE DE DATOS:
subsController.addSubsGeneral = async (req, res) => {
    const { email } = req.body;

    const subs = await Subs.find({ "email" : email });

    // console.log(subs);

    if (subs.length !== 0 ) {
        console.log("El correo ya esta registrado en el newsletter...");
        res.send(400);
    } else {
        // const newSubs = new Subs ({ nombre, apellido, email });
        const newSubs = new Subs ({ email });
        await newSubs.save();
        emailer.sendMailSub(email);
        res.send(200, {mensaje: "Subscriptor guardado!"});
    }

}

module.exports = subsController;