
const { validateToken } = require('../lib/user.controller.helper')


const getAuth = async (req, res) => {

    const { token } = req.body

    try {

        const decodedToken = validateToken(token)

        return res.send(decodedToken)

    } catch (error) {
        return res.status(400).send({
            Codigo: 400,
            Error: error.message
        })
    }
}

module.exports ={
    getAuth
}