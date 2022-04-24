import mongoose, { Schema, model } from 'mongoose'
import User from '../../../../domain/User'

export const userSchema = new Schema<User>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    token: [{ type: String }]
}, { timestamps: true })

const UserModel = model<User>('User', userSchema)
export default UserModel
export type ProductType = typeof userSchema