import mongoose from 'mongoose'
import { Schema, model, connect } from 'mongoose'
import Product from '../../../../domain/Product'

export const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    img: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

})

const ProductModel = model<Product>('Product', productSchema)
export default ProductModel
export type ProductType = typeof productSchema