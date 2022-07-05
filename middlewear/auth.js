const jwt = require('jsonwebtoken');
const userModel = require('../DB/model/User');

const roles = {
    Admin: 'Admin',
    User: 'User',
    HR: 'HR'
};

const auth = (accessRoles) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers['authorization'];
            if (!headerToken.startsWith(`${process.env.bearerKey} `)) {
                res.status(400).json({ message: "in-valid header token" });
            }
            else {
                const token = headerToken.split(' ')[1];

                const decoded = jwt.verify(token, process.env.loginToken);

                if (!decoded || !decoded.isLoggedIn) {
                    res.status(400).json({ message: 'in-valid token payload' })
                }
                else {
                    const findUser = await userModel.findOne({ _id: decoded.id }).select('userName email role');
                    // {_id: new ObjectId("62c04a07d0a549ccabdc8794"), userName: 'amr', email: '3amr.7assan1993@gmail.com', role: 'User'}
                    if (!findUser) {
                        res.status(404).json({ message: 'in-valid account id' })
                    }
                    else {
                        if (accessRoles.includes(findUser.role)) {
                            req.user = findUser;
                            next();
                        } else {
                            res.status(401).json({ message: 'not authorized account' });
                        }
                    }
                }
            }
        } catch (error) {
            res.status(500).json({ message: 'catch error token', error });
        }

    }
}
module.exports = { auth, roles };