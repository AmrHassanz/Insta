const { roles } = require("../../middlewear/auth");


const endPoint = {
    createPost: [roles.Admin, roles.User]
}
module.exports = endPoint;
