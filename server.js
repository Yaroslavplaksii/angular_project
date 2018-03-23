const express = require('express');
const passport = require('passport');
const session = require('express-session');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv').load();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(require('cookie-parser')());
app.use(session({
    name: 'JSESSION',
    secret: 'MYSECRETISVERYSECRET',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
   res.send('Its login page');
});

const registerRoute = require('./app/routes/reg_log')(app , passport);
require('./app/config/passport/passport.js')(passport);

// models.sequelize.sync().then(()=>{
//     console.log('Database its work');
// }).catch(()=>{
//     console.log('Error database');
// });

app.listen(1180,()=>console.log('Server is running .....'));