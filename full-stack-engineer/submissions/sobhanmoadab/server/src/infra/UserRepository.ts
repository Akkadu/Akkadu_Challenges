import { injectable } from "inversify";
import { IUserRepository } from "../app/repositories/IUserRepository";
import User from "../domain/User";
import UserModel from "./database/MongoDb/models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Types } from "mongoose";

@injectable()
export default class UserRepository implements IUserRepository {

    public async createUser(user: User): Promise<User> {
        const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'supersecret'
        const token = jwt.sign({ userId: user._id, userName: user.name }, secret, {
            expiresIn: "9000h",
        });
        const createdUser = await UserModel.create({
            _id: user._id,
            name: user.name,
            password: await bcrypt.hash(user.password, 10),
            token
        })

        return createdUser
    }

    public async updateUser(user: User): Promise<void> {
        // const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'supersecret'
        // const token = jwt.sign({ userId: user._id, userName: user.name }, secret, {
        //     expiresIn: "9000h",
        // });
        // const updateUser = await UserModel.findOneAndUpdate({
        //     name: user.name
        // }, {
        //     $push: { token }
        // })
        // return updateUser
        throw new Error('')
    }
    public async findUser(user: User): Promise<User | null> {
        const foundedUser = await UserModel.findOne({ name: user.name })
        return foundedUser
    }
    public async findUserById(id: string): Promise<User | null> {
        console.log({ id })
        const foundedUser = await UserModel.findById(id)
        return foundedUser
    }
}