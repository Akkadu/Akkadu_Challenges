import { inject, injectable } from "inversify";
import SignupUseCase from '../../useCases/user/Signup/SignupUsecase'
import UserRepository from "../../../infra/UserRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import SigninUseCase from "../../useCases/user/Signin/SigninUsecase";


@injectable()
export default class UserServiceLocator {
    constructor(@inject(UserRepository) private userRepository: IUserRepository) { }


    public buildSignupUsecase() {

        return new SignupUseCase(this.userRepository)
    }
    public buildSigninUsecase() {

        return new SigninUseCase(this.userRepository)
    }


}