const authController = require('../controllers/authController');
const {checkAccess} = require('../config/token')

module.exports = (app, passport) => {
    app.post('/register', authController.register);
    // app.post('/register', passport.authenticate('local', {
    //     successRedirect: '/',
    //     failureRedirect: '/login'
    // }));

    app.get('/login', authController.login);
    // app.post('/login',passport.authenticate('local',{
    //     successRedirect:'/dashboard',
    //     failureRedirect:'/login'
    // }));


    app.post('/login', (req, res) => {
        authController.login(req, (err, token) =>{
            if(err){
                res.send(
                    {
                        success: false,
                        err
                    }
                );
            }else{
                res.send(
                    {
                        success: true,
                        token
                    }
                );
            }
        });
    });


    app.post('/dashboard', authController.dashboard);
    app.put('/update/:id', authController.update);

    app.get('/exportdata/:token',authController.exportdata);

    app.get('/logout', authController.logout);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            console.log('Is autorize');
            return next();
        } else {
            console.log("no autorize");
            res.redirect('/login');
        }
    }
};

