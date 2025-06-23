const { generateToken } = require('../../config/jwt');
const { validatePassword, hashPassword } = require('../../utils/functions');
const { query } = require('../../utils/mysql');

const registerUser = async (user) => {
    if (
        !user.email ||
        !user.name ||
        !user.password
    )
        throw Error('Missing fields');


    const sql = `INSERT INTO users (email, name, password)
                 VAlUES (?, ?, ?);`;

    const password = await hashPassword(user.password);
    const { insertId } = await query(sql, [
        user.email,
        user.name,
        password
    ]);

    delete user.password;
    return { id: insertId, ...user, };
};  

const login = async (user) => {
    if (!user.email || !user.password) throw Error('Missing fields');
    const sql = `SELECT *
                 FROM users
                 WHERE email = ?`;
    const existsUser = await query(sql, [user.email]);
    if (existsUser.length === 0) throw Error('User not found');
    if (await validatePassword(user.password, existsUser[0].password)) {
        const token = await generateToken({
            id: existsUser[0].id,
            email: user.email,
            isLogged: true,
        });
        const userInfo = {
            token,
            email: user.email,
        };

        return userInfo;
    } else {
        throw Error('Password mismatch');
    }
};


const revalidateToken = async (id, email) => {
    const token = await generateToken({
        id,
        email,
        isLogged: true,
    });

    const user = {
        id,
        email,
        token,
    };

    return user;
};


module.exports = {
    login,
    revalidateToken,
    registerUser
};
