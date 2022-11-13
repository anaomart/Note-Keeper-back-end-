const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
    let token = req.header('token');
    jwt.verify(token, 'omar', (err, decoded) => {
        if (err) {
            res.json(err);
        } else {
            console.log(decoded);
            req.user = decoded;
            next();
        }
    })
}