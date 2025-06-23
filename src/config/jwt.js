const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY);
};


const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) throw Error('');
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.token = decodedToken;
        req.userId = decodedToken.id; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


module.exports = {
    generateToken,
    auth
};
