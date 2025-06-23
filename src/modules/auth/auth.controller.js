const { Router, Response } = require('express');
const { validateJWT } = require('../../middlewares/validate-jwt');
const { validateError } = require('../../utils/functions');
const { login, revalidateToken, registerUser } = require('./auth.gateway');

const signin = async (req, res = Response) => {
    try {
        const { email, password } = req.body;
        const user = await login({ email, password });
        res.status(200).json({
            user,
        });
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};

const validateToken = async (req, res = Response) => {
    try {
        const { id, email, role, isConfirmed } = req;
        const user = await revalidateToken(id, email, role, isConfirmed);
        res.status(200).json({
            user,
        });
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};

const register = async (req, res = Response) => {
    try {
        const { email, name, password } = req.body;
        console.log(req.body);
        const user = await registerUser({ email, name, password });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};


const authRouter = Router();
authRouter.post('/login', [], signin);
authRouter.get('/renew', [validateJWT], validateToken);
authRouter.post('/register', [], register);

module.exports = {
    authRouter,
};
