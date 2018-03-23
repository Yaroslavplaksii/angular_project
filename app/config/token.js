const jwt = require('jsonwebtoken');
const secret = 'token_login'

module.exports.checkAccess = (req, res, next) => {
    try {
        // check header, url parameters or post parameters for token
        const token = req.body.token || req.query.token || req.headers['access-token'] || null;
        console.log(token);

        if (!token) {
            throw new Error('No token provided');
        }

        // verifies secret and checks exp
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                throw new Error('Failed to authenticate token');
            } else {
                // store User data
                req.user = decoded;
                next();
            }
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
};
