const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


/*Routers*/
app.use(require('./Routers/UserRouter'));
app.use(require('./Routers/RolRouter'));
app.use(require('./Routers/PetRouter'));
// app.use(require('./Routers/UserRouter'));
// app.use(require('./Routers/AccountRouter'));
// app.use(require('./Routers/StipulationRouter'));
// app.use(require('./Routers/SavingRouter'));
// app.use(require('./Routers/signingRouter'));
// app.use(require('./Routers/WithdrawalRouter'));
// app.use(require('./Routers/AccountStatusRouter'));
// app.use(require('./Routers/MeetingRouter'));
// app.use(require('./Routers/LoanRouter'));
// app.use(require('./Routers/ExpenseRouter'));

app.use('/', (req, res) => {
    res.json({
        msg: "Servicio en funcionamiento",
        err: "",
        status: "success",
        data: {}
    })
})
//app.use(require('./router'));

module.exports = app;