import mongoose from "mongoose"

const ordersSchema = new mongoose.Schema({
    "customerId": {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },

   orderItems: {
    type: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },

            quantity: {
                type: Number,
                required: true,
                min: 1
            },

            priceAtPurchase: {
                type: Number,
                required: true
            }
        }
    ],

    validate: {
        validator: function (value) {
            return Array.isArray(value) && value.length > 0;
        },
        message: "You must order at least one item"
    }
    },

    totalAmount: {
        type : Number,
        required : true
    },

    shippingAddress: {
        type : String,
        required : true
    },

    status: {
        type : String,
        enum : ['processing', 'shipped', 'delivered', 'cancelled'],
        default : 'processing'
    }

} , {timestamps : true});




export default mongoose.model("Order",ordersSchema);