// const sequelize = require('./index').sequelize;
const Sequelize = require('sequelize');
const path = require('path');
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname,'..','config','config.json'))[env];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres',
        //отключить логи в консоли
        logging: false
    }
);

const User = sequelize.define('users', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    firstname: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    lastname: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    username: {
        type: Sequelize.TEXT
    },
    about: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.STRING,
        // validate: {
        //     isEmail: true
        // }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_login: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
});

User.issetUser = (email) => User.findOne({
    where: {
        email
    },
    raw: true
});

// User.create(data).then(function(newUser, created) {
//     if (!newUser) {
//         return done(null, false);
//     }
//     if (newUser) {
//         return done(null, newUser);
//     }
// });

User.sync();

module.exports = User;