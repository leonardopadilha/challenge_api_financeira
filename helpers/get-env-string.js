require('dotenv').config();

/**
 * Recupera um env string.
 * 
 * @param {string} name env name.
 * @returns {String}
 */

module.exports = function getEnvString(name) {
    const value = process.env[name];

    if (!value) {
        throw new Error('Env string inválido');
    }
    return value;
}