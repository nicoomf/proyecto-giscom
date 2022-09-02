const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();
// console.log(process.env); 

const { randomNameArchivo } = require('./helpers/libs.js');

const nombreArch = randomNameArchivo();

// nombreArch + path.extname(file.originalname)

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname );
    }
})

// Initializations:
const app = express();
require('./config/passport');

// Settings:
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: false, limit: '25mb' }))
app.use(bodyParser.json({limit: '25mb'}))

// Middlewares:
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Multer
app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/uploads')
}).single('archivo'));


// Global Variables:
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes:
app.use(require('./routes/index.routes'));
app.use(require('./routes/admin.routes'));
app.use(require('./routes/equipo.routes'));
app.use(require('./routes/activ.routes'));
// app.use(require('./routes/upload.routes'));

// Static Files:
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;