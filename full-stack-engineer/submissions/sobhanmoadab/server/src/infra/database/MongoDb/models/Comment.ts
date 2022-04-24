import mongoose, { Schema, model } from 'mongoose'
import Comment from '../../../../domain/Comment'

export const commentSchema = new Schema<Comment>({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

const CommentModel = model<Comment>('Comment', commentSchema)
export default CommentModel
export type ProductType = typeof commentSchema