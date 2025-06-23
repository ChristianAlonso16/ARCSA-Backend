const bcrypt = require('bcryptjs');

const validateError = (error) => {
    switch (error.message) {
        case 'Wrong type':
            return 'Revisa los tipos de los campos enviados';
        case 'Missing fields':
            return 'Faltan campos obligatorios';
        case 'Nothing found':
            return 'No se encontraron resultados';
        case 'Password mismatch':
            return 'Las credenciales no coinciden';
        case 'User not found':
            return 'El usuario no fue encontrado';
        case 'Email already exists':
            return 'El correo ya está registrado';
        case 'Token is not valid':
            return 'El token no es válido';
        default:
            return 'Revisa la solicitud';
    }
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

const validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    validateError,
    hashPassword,
    validatePassword,
};
