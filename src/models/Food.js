const { Schema, model } = require("mongoose")

const foodSchema = new Schema(
    {
        id: {
            type: String
        }, 
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        diets: [
            {
                type: Schema.Types.String,
                required: false
            }
        ],
        price: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            default: 5
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant"
        },
        buyer: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false,
      }
)

foodSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject._v;
    },
  });

module.exports = model("Food", foodSchema)