const jwt = require('jsonwebtoken');
let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
    // return res.status(200).json({
    //     token: token
    // });
}

module.exports = {
    verificaToken
}