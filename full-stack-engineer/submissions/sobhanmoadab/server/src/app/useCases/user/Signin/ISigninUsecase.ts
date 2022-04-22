import User from "../../../../domain/User";
import SigninDto from './ISigninDto'

export default interface ISigninUsecase {
    signin(signinDto:SigninDto): Promise<User>
}