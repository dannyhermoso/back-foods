const bcrypt = require('bcrypt')

const Restaurant = require('../models/Restaurant')

const { sendEmail, sendVerificationEmailtoRestaurant, randomCode, createToken } = require('../lib/user.controller.helper')


const verifyAndPreRegisterRestaurant = async (req, res) => {

    const { email, name, owner_name, phone, country, city, state } = req.body

    try {
        const restaurantByEmail = await Restaurant.findOne({ email: email })
        if (restaurantByEmail) throw Error(`El email: ${email} ya se encuentra registrado`)

        const restaurantByName = await Restaurant.findOne({ name: name })
        if (restaurantByName) throw Error(`El nombre de negocio: ${name} ya se encuentra registrado`)

        await Restaurant.create({
            email,
            name,
            phone,
            owner_name,
            country,
            state,
            city
        })

        return res.status(201).send({
            status: true,
            msg: 'Se puede seguir con el registro de negocio'
        })

    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message
        })
    }
}


const registerRestaurant = async (req, res) => {

    const { email, password, image } = req.body

    try {
        const code = randomCode()

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const restaurant = await Restaurant.findOneAndUpdate(
            {
                email: email
            },
            {
                password: hash,
                image: image,
                verification_code: code
            },
            {
                new: true
            })

        if (restaurant) {
            const temporalVerificationLink = `http://localhost:3000/negocios/verifyAccount/${restaurant.id}`
            await sendVerificationEmailtoRestaurant(email, restaurant.name, temporalVerificationLink, code)
            return res.status(200).send({
                status: true,
                path: `/negocios/verifyAccount/${restaurant.id}`,
                msg: 'Restaurante creado exitosamente'
            })
        }

        throw Error('Error al actualizar campos del restaurante')

    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message
        })
    }
}

const loginRestaurant = async (req, res) => {

    const { email, password } = req.body
    try {

        const currentRestaurant = await Restaurant.findOne({ email: email })

        if (!currentRestaurant) {
            throw Error(`El email: ${email} no corresponde a ningun negocio.`)
        }

        const isCorrectPassword = await bcrypt.compare(password, currentRestaurant.password)

        if (currentRestaurant && !isCorrectPassword) {
            throw Error('Contraseña incorrecta')
        }


        const token = createToken({
            name: currentRestaurant.name,
            id: currentRestaurant.id,
            email,
            type: 'restaurant'
        })

        return res.status(201).send({
            status:true,
            token,
            msg:'Usuario loggeado correctamente'
        })

    } catch (error) {
        return res.status(404).send({
            status: false,
            msg: error.message
        })
    }
}

const getAllRestaurants = async (req, res) => {

    res.send(await Restaurant.find())

}

const getOneRestaurant = async (req, res) => {
    const { id } = req.params

    try {
        const restaurant = await Restaurant.findOne({ _id: id })

        if (!restaurant) throw Error(`El id: ${id} no corresponde a ningun restaurante.`)

        return res.send(restaurant)

    } catch (error) {

        return res.status(404).send({
            Codigo: 404,
            Error: error.message
        })

    }

}

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

const getVerification = async (req, res) => {
    const { restaurantId, code } = req.body


    try {
        const restaurant = await Restaurant.findOne({ _id: restaurantId })
        console.log(restaurant.id)
        if (!restaurant) {
            throw Error(`No tienes los permisos necesarios para estar en esta pagina`)
        }
        console.log(code)
        console.log(restaurant.verification_code)
        const correctCode = code === restaurant.verification_code ? true : false

        if (correctCode) {

            await Restaurant.findByIdAndUpdate(
                { _id: restaurantId },
                { verified:true },
                { new: true })


            const token_info = {
                id: restaurant.id,
                name: restaurant.name,
                email: restaurant.email,
                type: 'restaurant'
            }

            const token = createToken(token_info)
            return res.status(200).send({
                status: true,
                token: token,
                msg: 'Codigo correcto'
            })
        }

        throw Error('Codigo incorrecto intenta de nuevo')

    } catch (error) {
        return res.send({
            status: false,
            msg: error.message
        })
    }
}

const isRestaurantVerificated = async (req, res) => {
    const { restaurantId } = req.params

    try {
        const restaurant = await Restaurant.findOne({ id: restaurantId })

        if (!restaurant) {
            throw Error(`El id: ${restaurantId} no pertenece a ningun restaurante`)
        }

        if (restaurant.account_verified) {
            throw Error(`El Restaurante con id: ${restaurantId} ya verifico su cuenta`)
        }

        return res.status(200).send({
            status: true,
            msg: 'El restaurante debe verificar su cuenta'
        })

    } catch (error) {
        return res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}

module.exports = {
    registerRestaurant,
    getAllRestaurants,
    getOneRestaurant,
    getAuth,
    loginRestaurant,
    verifyAndPreRegisterRestaurant,
    getVerification,
    isRestaurantVerificated
}