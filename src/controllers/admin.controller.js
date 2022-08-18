const adminController = {};

const passport = require("passport");
const { findById } = require("../models/Admin");

const Admin = require("../models/Admin");

adminController.renderSignUpForm = (req, res) => {
  res.render("admin/signup");
};

adminController.renderAdministradores = async (req, res) => {
  const admin = await Admin.find();
  res.render("admin/general/administradores", { admin });
};

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

adminController.renderEditAdminForm = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  res.render("admin/general/editadmin", { admin });
};

adminController.updateAdmin = async (req, res) => {
  const { name, email, password, actualPassword } = req.body;
  const errors = [];
  const admin = Admin.findById(req.params.id);

  const match = await admin.matchPassword(actualPassword);

  if (match) {
    console.log("la contraseña coincide...");
  } else {
    res.send(400);
  }
};

adminController.renderSignInForm = (req, res) => {
  res.render("admin/signin");
};

adminController.signIn = passport.authenticate("local", {
  failureRedirect: "/admin/signin",
  successRedirect: "/admin/panel",
  failureFlash: true,
});

adminController.logOut = (req, res) => {
  req.logout();
  req.flash("success_msg", "Cerraste Sesión");
  res.redirect("/admin/signin");
};

adminController.renderPanel = (req, res) => {
  res.render("admin/panel");
};

module.exports = adminController;
