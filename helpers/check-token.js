const jwt = require('jsonwebtoken');

function checkToken(request, response, next) {
    try {
        const token = request.headers.authorization;

        const decodedToken = jwt.verify(token, 'secretKey');

        next();
    } catch (error) {
        // Token süresi dolmuş
        if (error.name === 'TokenExpiredError') {
            return response.status(401).send({
                message: 'Expired Token',
                status: -1
            })
        }
        // Geçersiz bir token veya imza ile erişmeye çalışma
        else if (error.name === 'JsonWebTokenError') {
            return response.status(401).send({
                message: 'Invalid Token',
                status: -1
            })
        }
        // Yetkisiz erişim
        else {
            return response.status(401).send({
                message: 'Unauthorized Access',
                status: -1
            })
        }
    }
}

module.exports = {
    checkToken
}