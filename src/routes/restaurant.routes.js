const { Router } = require('express')

const {
    registerRestaurant,
    getAllRestaurants,
    getOneRestaurant, getAuth,
    loginRestaurant,
    verifyAndPreRegisterRestaurant,
    getVerification,
    isRestaurantVerificated
} = require('../controllers/restaurant.controller')


const router = Router()

router.get("/", getAllRestaurants)

router.get("/:id", getOneRestaurant)

router.post("/register/verify", verifyAndPreRegisterRestaurant)

router.post("/verify", getVerification)

router.get("/verify/:restaurantId",isRestaurantVerificated)

router.post("/register", registerRestaurant)

router.post("/login", loginRestaurant)

router.post("/auth", getAuth)


module.exports = router