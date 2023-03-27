const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    try {
        const accessToken = req.cookies.jwt;

        if (!accessToken) {
            return res.status(403).send('Cannot access this route');
        }
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).send('Session expired');
            }
            req.username = decoded.username;
            return next();
        });
    } catch (err) {
        return res.status(401).send('Unauthorized User');
    }
    return 0;
};

exports.authorize = async (req, res, next) => {
    const tokenUsername = req.username;
    if (tokenUsername !== req.params.username) {
        return res.status(401).send('Permission denied');
    }
    return next();
};
