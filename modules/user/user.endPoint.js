const { roles } = require("../../middlewear/auth");

const endPoint = {
    displayProfile: [roles.Admin, roles.User],
}

module.exports = endPoint;