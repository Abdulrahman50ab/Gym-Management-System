const Gym = require('../Modals/gym');
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.cookie_token;
        if(!token){
            return res.sattus(401).json({erroe:'no token authorization denied'});
        }
        const decode = jwt.verify(token,process.env.JWT_SecretKey);
        req.gym = await Gym.findById(decode.gym_id).select('-password');
        next();

    } catch (err) {
        res.status(401).json({ erroe: 'Token is not valid' });
    }
}

module.exports = auth;