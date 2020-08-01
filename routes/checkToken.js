const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const token = req.header('auth-token');

    if(!token){
        res.status(400).send('Access Denied');
        return
    }
    try {
        const verified = jwt.verify(token, 'tumo_students');
        req.user = verified.id;
        next();
    } catch (error) {
        // console.log(error);
        res.status(400).send('Invalid token');
    }
}