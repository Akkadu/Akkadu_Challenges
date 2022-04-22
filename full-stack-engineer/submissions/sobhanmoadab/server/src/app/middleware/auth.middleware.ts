import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { inject } from "inversify";
import UserRepository from "../../infra/UserRepository";
import { IUserRepository } from "../repositories/IUserRepository";


interface Req extends Request {
    headers: any,
    tokenInfo: any,
    userId: string

}
interface ITokenInfo extends JwtPayload {
    _id: string,
    token: string[]

}

export function AuthMiddleware() {
    const userRepository = new UserRepository()
    return async (req: Req, res: Response, next: NextFunction): Promise<any> => {
        const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'supersecret'
        if (!req.headers || !req.headers.authorization) return res.status(403).json({ status: 403, result: 'You dont have any token' })
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(403).json({ status: 403, result: 'You dont have any token' })
        const tokenInfo: any = jwt.verify(token, secret);
        req.tokenInfo = tokenInfo;
        const foundedUser = await userRepository.findUserById(tokenInfo.userId)
        if (!foundedUser) return res.status(400).json({ status: 400, result: 'Did not find anyone with this token' })
        req.userId = tokenInfo.userId
        next()
    }

}