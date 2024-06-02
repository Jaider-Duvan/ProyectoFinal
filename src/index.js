/* -------------------------- Importar dependencias ------------------------- */
import express from 'express'

import { join, dirname } from 'path' // identifica una direccion especifica para concatenar info
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars'
import morgan from 'morgan';
/* ----------------------------- Inicialización ----------------------------- */
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
/* --------------------------------- Settings -------------------------------- */

app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
/* ---------------- Configuracion del manejador de plantillas --------------- */
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs')

/* ------------------------------ Middlewares ------------------------------ */

app.use(morgan('dev')); // conocer las peticiones 
app.use(express.urlencoded({ extended: false })); // decodificar las peticiones de la url
app.use(express.json()); // Usa informacion en formato Json

/* --------------------------------- Routes --------------------------------- */
app.get('/', (req, res) => {
    res.render('index')
});
/* ------------------------------ Public files ------------------------------ */
app.use(express.static(join(__dirname, 'public')));

/* ------------------------------- Run Server ------------------------------- */
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'))
})