const adminController = {};

const passport = require("passport");
const { findById } = require("../models/Admin");
const bcrypt = require('bcryptjs');

const Admin = require("../models/Admin");

// RENDERIZA EL FORMULARIO PARA CREAR ADMINISTRADORES:
adminController.renderSignUpForm = (req, res) => {
  res.render("admin/signup");
};

// RENDERIZA LOS ADMINISTRADORES CREADOS EN EL PANEL DE ADMINISTRACION:
adminController.renderAdministradores = async (req, res) => {
  const admin = await Admin.find();
  res.render("admin/general/administradores", { admin });
};

// CREA UN ADMINISTRADOR EN LA BASE DE DATOS:
adminController.signUp = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length < 6) {
    errors.push({
      text: "La contraseña debe tener un largo mayor a 6 caracteres",
    });
  }
  if (errors.length > 0) {
    res.render("admin/signup", { errors, name, email });
  } else {
    const emailAdmin = await Admin.findOne({ email: email });
    if (emailAdmin) {
      req.flash("error_msg", "El Email ya esta en uso");
      res.redirect("/admin/signup");
    } else {
      const newAdmin = new Admin({ name, email, password });
      newAdmin.password = await newAdmin.encryptPassword(password);
      await newAdmin.save();
      req.flash("success_msg", "Admin registrado con exito!");
      res.redirect("/admin/panel");
    }
  }
};

// RENDERIZA EL FORMULARIO PARA EDITAR ADMINISTRADORES:
adminController.renderEditAdminForm = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  res.render("admin/general/editadmin", { admin });
};

adminController.updateAdmin = async (req, res) => {
  const { password, actualPassword, email } = req.body;
  const admin = await Admin.findOne({email});
  console.log(admin.password);

  const id = req.params.id;
  console.log(id);

  const match = await bcrypt.compare(actualPassword, admin.password);

  if (match) {
    console.log("la contraseña coincide...");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await Admin.findByIdAndUpdate(req.params.id, {
      password: hashPassword
    });

    // res.redirect(`/admin/edit-admin/${id}`);
    res.send(200, {mensaje: "contraseña actualizada"});
  } else {
    res.send(400);
  }
};

// ELIMINA ALGUN ADMINISTRADOR:
adminController.deleteAdmin = async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.redirect('/admin/administradores');
}

// RENDERIZA EL LOGIN:
adminController.renderSignInForm = (req, res) => {
  res.render("admin/signin");
};

// AUTENTICA AL USUARIO:
adminController.signIn = passport.authenticate("local", {
  failureRedirect: "/admin/signin",
  successRedirect: "/admin/panel",
  failureFlash: true,
});

// CIERRA LA SESION DEL USUARIO:
adminController.logOut = (req, res) => {
  req.logout();
  req.flash("success_msg", "Cerraste Sesión");
  res.redirect("/admin/signin");
};

// RENDERIZA EL PANEL DE ADMINISTRACION:
adminController.renderPanel = (req, res) => {
  res.render("admin/panel");
};

module.exports = adminController;
