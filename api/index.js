const dotenv = require('dotenv').config();
const app = require('./src/Controllers/FallosRegistros.js');
//const app = require('./src/app.js');
// const db = require('./src/Database/db.js');

(async () => {
    try {        
        /* await db.authenticate();
        await db.sync()
        console.log("Base de datos conectada ") */
        app.set('port', process.env.PORT || 4000);

        app.listen(app.get('port'), () => {
            console.log('Servidor en puerto', app.get('port'));
        });
    } catch (error) {
        throw new Error("Error al conectar la base de datos: ", error);
    }
})()