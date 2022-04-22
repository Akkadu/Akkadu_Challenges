import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, interfaces, request, response } from "inversify-express-utils";
import UserServiceLocator from "../../../app/configuration/usecases/UserServiceLocator";
import SigninDto from "../../../app/useCases/user/Signin/ISigninDto";
import ISigninUsecase from "../../../app/useCases/user/Signin/ISigninUsecase";
import SignupDto from "../../../app/useCases/user/Signup/ISignupDto";
import { ISignupUsecase } from "../../../app/useCases/user/Signup/ISignupUsecase";

@controller('/api/v1/users')
export default class UserController implements interfaces.Controller {
    private readonly signupUseCase: ISignupUsecase
    private readonly signinUseCase: ISigninUsecase

    constructor(@inject(UserServiceLocator)
    protected readonly serviceLocator: UserServiceLocator
    ) {
        this.signupUseCase = serviceLocator.buildSignupUsecase()
        this.signinUseCase = serviceLocator.buildSigninUsecase()
    }

    @httpPost('/signup')
    public async signup(@request() req: Request, @response() res: Response) {
        try {
            const dto: SignupDto = req.body
            const validated = await SignupDto.validate(dto)
            const createdUser = await this.signupUseCase.signup(validated)
            return res.status(200).json({ status: 200, result: { _id: createdUser._id, token: createdUser.token } })

        } catch (err: any) {
            return res.status(500).json({ status: 500, result: err.message })
        }
    }

    @httpPost('/signin')
    public async signin(@request() req: Request, @response() res: Response) {
        try {
            const dto: SigninDto = req.body
            const validated = await SigninDto.validate(dto)
            const foundedUser = await this.signinUseCase.signin(validated)
            return res.status(200).json({ status: 200, result: { _id: foundedUser._id, token: foundedUser.token } })

        } catch (err: any) {
            console.log({ err })
            return res.status(500).json({ status: 500, result: err.message })
        }
    }

}