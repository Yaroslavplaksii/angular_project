const bcrypt = require('bcrypt-nodejs');
const User = require('../../models/users');
const jwt = require('jsonwebtoken');
 const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const user = require('../../../app/models/users');

// console.log(bcrypt.hashSync('1111',bcrypt.genSaltSync(8),null));
const secret = 'token_login';

module.exports = (passport)=>{
       passport.use('local',new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req,email,password,done)=>{

            let isValidPassword = (userpass,password)=>{
                return bcrypt.compareSync(password,userpass);
            };

            let generateHash = (password)=>{
                return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
            };

                    // User.findOne({
                    //     where: {
                    //         email
                    //     }
                    // }.then(function(err, user) {
                    //     console.log("Test 1234");
                    //     if (err){
                    //         console.log("Error 1");
                    //         return done(err);
                    //     }
                    //     if (!user){
                    //         console.log("User error");
                    //         return done(null, false);
                    //     }
                    //     if (!user.isValidPassword(user.password,password)){
                    //         console.log("Passw error");
                    //         return done(null, false);
                    //     }
                    //         console.log(user);
                    //     return done(null, user);
                    // }));


            User.findOne({
                where: {
                    email
                },
                raw: true
            }).then((user)=>{

                if(!user) {
                    console.log("email is not valid");
                    return done(null, false, {
                        message: "email is not valid"
                    });
                }
                 if(!isValidPassword(user.password,password)){
                     return done(null,false,{
                         message:"password is not valid"
                     });
                 }
                const token = jwt.sign({id: user.id, login: user.email}, secret, {
                        expiresIn:3600
                     });
                // console.log(token);
                // console.log('Is auntificated');
                 // let userInfo = user.get();
                 return done(null,token);

                // }else{
                //     let userPassword = generateHash(password);
                //     let data = {
                //         email:email,
                //         password:userPassword,
                //         firstname:req.body.firstname,
                //         lastname:req.body.lastname
                //     };
                //     User.create(data).then((newUser,created)=>{
                //         if(!newUser){
                //             return done(null,false);
                //         }
                //         if(newUser){
                //             return done(null,newUser);
                //         }
                //     });
                // }
            }).catch((error)=>{
                console.log('Error Fatal');
                return done(null,false,{
                    message:"Fatal error"
                });
            });
        }
        ));
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser((id,done)=>{
        User.findById(id).then((user)=>{
            if(user){
                done(null,user.get());
            }else{
                done(user.errors,null);
            }
        });
    });
};