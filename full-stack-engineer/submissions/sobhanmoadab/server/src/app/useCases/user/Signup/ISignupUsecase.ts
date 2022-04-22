import User from "../../../../domain/User";
import SignupDto from './ISignupDto'

export interface ISignupUsecase {
    signup(signupDto:SignupDto): Promise<User>
}