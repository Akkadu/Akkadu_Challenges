import Product from "../../../../domain/Product"
import { IUserRepository } from "../../../repositories/IUserRepository"
import { ISignupUsecase } from "./ISignupUsecase"
import SignupDto from './ISignupDto'
import User from "../../../../domain/User"

export default class SignupUseCase implements ISignupUsecase {


    private readonly userRepository: IUserRepository

    constructor(
        userRepository: IUserRepository
    ) {
        this.userRepository = userRepository
    }

    public async signup(signupDto: SignupDto): Promise<User> {
        let user = new User(signupDto.name, signupDto.password)
        const foundedUser = await this.userRepository.findUser(user)
        if(foundedUser) throw new Error('Name is reserved, please choose another another')
        const createdUser = await this.userRepository.createUser(user)
        console.log({createdUser})
        return createdUser
    }

}