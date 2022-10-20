const { Schema, model } = require("mongoose")

const userSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
        },
        plus:{
            type:Boolean,
            default:false
        },
        admin: {
            type: Boolean,
            default: false
        },
        country: {
            type: String
        },
        purchased_foods: [
            {
                type: Schema.Types.ObjectId,
                ref: "Food"
            }
        ],
        orders_foods: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order"
            }
        ],
        login_Google: {
            type: Boolean,
            default: false
        },
        localStorageToken: {
            type: String
        },
        verification_code:{
            type: String,

        },
        account_verified: {
            type: Boolean,
            default: false
        },
        available_money: {
            type: Number,
            default: 0,
            min: 0
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.hashPassword;
    },
});


module.exports = model("User", userSchema)