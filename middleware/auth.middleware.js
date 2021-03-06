const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next) => {
    if (req.metod === 'OPTIONS') {
        return next()
    }
    try {
    const token = req.headers.authorization.split('  '[1]) // "Bearer Token"

        if (!token) {
            res.status(401).json({ message: 'No authorization' })
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()

    }catch (e) {
        res.status(401).json({ message: 'No authorization' })
    }
}