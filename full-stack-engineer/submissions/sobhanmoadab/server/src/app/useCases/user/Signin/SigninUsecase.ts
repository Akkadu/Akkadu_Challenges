import Product from "../../../../domain/Product"
import { IUserRepository } from "../../../repositories/IUserRepository"
import ISigninUsecase from "./ISigninUsecase"
import User from "../../../../domain/User"
import SigninDto from "./ISigninDto"
import bcrypt from 'bcrypt'

export default class SigninUseCase implements ISigninUsecase {


    private readonly userRepository: IUserRepository

    constructor(
        userRepository: IUserRepository
    ) {
        this.userRepository = userRepository
    }

    public async signin(signinDto: SigninDto): Promise<User> {
        let user = new User(signinDto.name, signinDto.password)
        const foundedUser = await this.userRepository.findUser(user)
        if (!foundedUser) throw new Error('Could not find User')
        const isValid = bcrypt.compareSync(signinDto.password, foundedUser.password)
        console.log(isValid)
        if(!isValid) throw new Error('name or password is wrong')
        return foundedUser

    }


}