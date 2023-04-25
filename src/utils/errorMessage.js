const validatorMessage = function(attribute) {
    return `The property ${attribute} is invalid`;
}

const notExists = function(attribute) {
    return `${attribute} does not exist`;
}

module.exports = {
    validatorMessage: validatorMessage,
    notExists: notExists
}