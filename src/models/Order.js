const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    user_id_mongo: { 
        type: Schema.Types.ObjectId,
        Ref: "User"
    },
    restaurant_id_mongo: {
        type: Schema.Types.ObjectId,
        Ref: "Restaurant"
    },
    user_id_stripe: { type: String, required: true },
    user_name: { type: String, required: true },
    user_email: { type: String },
    user_phone: { type: String },
    // customerId: { type: String },
    // paymentIntentId: { type: String },
    address: {
        city: { type: String },
        country: { type: String },
        address_line_1: { type: String },
        postal_code: { type: String },
    },
    products: [
        {
            title: { type: String },
            cartQuantity: { type: Number },
            subtotal_price: { type: Number },
            id_food: { type: String }
        }
    ],
    total_price: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    delivery_status: { type: String, default: "pending" },
},
    {
        timestamps: true,
    }
)

module.exports = model("Order", orderSchema)