import mongoose from "mongoose"

const ordersSchema = new mongoose.Schema({
    "customerId": {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },

    orderItems: [
      {
        productId: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Product"
        },

        quantity: {
            type : Number,
            required : true
        },

        priceAtPurchase: {
            type : Number,
            required : true
        }

      },
    ],

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