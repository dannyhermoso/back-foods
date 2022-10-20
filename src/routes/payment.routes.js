const { Router } = require("express")
const { 
    handleWebHook,
    payment 
} = require("../controllers/payment.controller")

const router = Router()

router.post("/webhook", handleWebHook)
router.post("/create-checkout-session", payment);

module.exports = router