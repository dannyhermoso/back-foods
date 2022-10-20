require('dotenv').config()

const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const { SECRET } = process.env


const getByName = ({ users, name }) => {
    return users.filter((user) =>
        user.name?.toLowerCase().includes(name.toLowerCase())
    )
}

const getByEmail = ({ users, email }) => {
    return users.filter((user) =>
        user.email?.toLowerCase().includes(email.toLowerCase())
    )
}

const createToken = (user) => {
    const { id, name, email, type } = user
    console.log(id, type)
    const payload = {
        id,
        name,
        email,
        type
    }
    return jwt.sign(payload, SECRET, { expiresIn: '3d' })
}

const validateToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET)

        return decodedToken

    } catch (error) {

        return {
            error: error.message
        }

    }

}

const randomCode = () => {
    let code = []
    for (let i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 9))
    }
    return code.join('')
}
//------------------------------------------------CONFIG DE MAILS----
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: "francofraticelli41@gmail.com",
        pass: "ajnrwmsloiismihj",
    },
})


transporter.verify()
    .then(() => {
        console.log('nodemailer is ready')
    })
//---------------------------------------------------FIN CONFIG DE MAILS----

const sendEmail = async (email, firstName, link, code) => {

    await transporter.sendMail({
        from: '"😎Foodify😎" <francofraticelli41@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Bienvenido a Foodify", // Subject line
        html: `<b>Hola ${firstName}👽 Gracias por registrarte. Ingresa este codigo:${code} en el siguiente link para confirmar tu cuenta: ${link} </b>`, // html body
    })

}

const sendVerificationEmail = async (email, name, link, code) => {

    await transporter.sendMail({
        from: '"😎Foodify😎" <francofraticelli41@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Verifica tu cuenta de Foodify", // Subject line
        html: `<b>Hola ${name}👽,Para verificar tu cuenta ingresa este codigo:${code} en siguiente link: ${link} </b>`,
    })

}

const sendVerificationEmailtoRestaurant = async (email, name, link, code) => {

    await transporter.sendMail({
        from: '"😎Foodify😎" <francofraticelli41@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Bienvenidos a Foodify", // Subject line
        html: `<b>Hola ${name}👽,Para verificar la cuenta de tu negocio ingresa este codigo:${code} en siguiente link: ${link} </b>`,
    })

}


module.exports = {
    createToken,
    validateToken,
    getByName,
    getByEmail,
    sendEmail,
    sendVerificationEmail,
    randomCode,
    sendVerificationEmailtoRestaurant
}