const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/users');
const secret = 'token_login';

let generateHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
module.exports = {
    register : (req,res)=>{
        const {email, password, firstname, lastname} = req.body;
      try{
          if(email.length===0 || password.length==0){
              res.send({error:true, message: 'The field of email or password can not be empty'});
          }else{
                User.findOne({
                    where: {
                        email: email
                    }
                }).then(function(user) {
                    if (user)
                    {
                        res.send({error:true, message: 'That email is already taken'});
                    }else{
                        let userPassword = generateHash(password);
                        let data =
                            {  email: email,
                                password: userPassword,
                                firstname: firstname,
                                lastname:lastname
                            };
                        User.create(data).then(function(newUser, created) {
                            if (!newUser) {
                                res.send({error:true, message: 'An error occurred during the registration process'});
                            }
                            if (newUser) {
                                res.send({error:false, message: 'User is successfully registered'});
                            }
                        });
                    }
                });
          }
      }catch(err){
          res.send({error:true, message: 'Unknown error'});
      }
    },
    login : async (req , done)=>{
        const {email, password} = req.body;
        try{
            const issetUser = await User.issetUser(email);
            if(!issetUser){
                return done('User not registred', null);
            }
            const isValidPass = isValidPassword(issetUser.password,password.toString());
            if(!isValidPass){
                return done("password is not valid", null);
            }
            const token = jwt.sign({id: issetUser.id, login: issetUser.email}, secret, {
                expiresIn:3600
            });
            done(null, token);
        }catch (err){
            console.log(err);
            done(err, null);
        }
    },
    dashboard:(req,res)=>{
       const {user_id} = req.body;
        try{
            if(!user_id){
                res.redirect('/');
            }else{
                User.findOne({
                    where: {
                        id: user_id
                    },
                    attributes: ['id','firstname', 'lastname','email']
                }).then(function(user) {
                    if (user)
                    {
                        res.send(user);
                    }else{
                        res.redirect('/');
                        res.send({error:true, message: 'Something happened!'});
                    }
                });
            }
        }catch(err){
            res.send({error:true, message: 'Unknown error'});
        }
    },
    update:(req,res)=>{
        const {id, email,firstname, lastname, password} = req.body;
        try{
                User.update({
                            email:email,
                            firstname:firstname,
                            lastname:lastname
                            },
                    {
                     where:{id:id}
                    }).then(function(){
                        res.send({error:false, message: 'User data is updated!'});
                });
            if(password.length > 0){
                let userPassword = generateHash(password);
                User.update({
                        password:userPassword,
                    },
                    {
                        where:{id:id}
                    }).then(function(){
                    // res.send({error:false, message: 'Password is updated!'});
                });
            }
        }catch(err){
            res.send({error:true, message: 'Something happened!'});
        }
    },
    exportdata:(req,res)=>{
        const user_data = jwt.decode(req.params['token']);
        try{
            if(!user_data['id']){
                res.redirect('/');
            }else{
                User.findOne({
                    where: {
                        id: user_data['id']
                    },
                    attributes: ['firstname','lastname','id','email','createdAt']
                }).then(function(user) {
                    if (user)
                    {
                        User.findAll({
                            attributes: ['firstname','lastname','id','email','createdAt']
                        }).then((users)=>{
                            require('../models/exportexcel')(user,users);
                        });
                    }else{
                        res.redirect('/');
                        res.send({error:true, message: 'Something happened!'});
                    }
                });
            }
        }catch(err){
            res.send({error:true, message: 'Unknown error'});
        }
    },
    logout:(req,res)=>{
        req.session.destroy((error)=>{
            res.redirect('/');
        });
    }
};
let isValidPassword = (userpass,password)=>{
    return bcrypt.compareSync(password,userpass);
};


