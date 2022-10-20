const { Schema, model } = require("mongoose")

const restaurantSchema = new Schema(
    {
        image:{
            type:String
        },
        name:{
            type:String
        },
        owner_name: {
            type: String,
            require: true,
            trim: true
        },
        phone:{
            type:String,
        },
        email: {
            type: String, 
            require: true,
            unique: true
        },
        password: {
            type: String,
            // require: true
        },
        country: {
            type: String,
            // require: true
        },
        state:{
            type: String
        },
        city:{
            type:String
        },
        coordinates:{
            type:Array
        },
        address:{
            type:String
        },
        selling_foods: [
            {
                type: Schema.Types.ObjectId,
                ref: "Food"
            }
        ],
        orders_selled: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order"
            }
        ],
        online_payment:{
            type: Boolean,
            default: true
        },
        delivery:{
            type:Boolean,
            default: true
        },
        plus:{
            type:Boolean,
            default:true
        },
        localStorageToken: {
            type: String
        },
        deleted: {
            type: Boolean,
            default: false
        },
        rating:{
            type:Number,
            default: 3
        },
        delivery_time:{
            type:Number,
            default: 20
        },
        verified:{
            type:Boolean,
            default:false
        },
        verification_code:{
            type:String
        }
    }
)


restaurantSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject._v;
      delete returnedObject.hashPassword;
    },
  });

module.exports = model("Restaurant", restaurantSchema)