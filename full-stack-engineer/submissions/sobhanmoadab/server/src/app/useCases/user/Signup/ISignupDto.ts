
export default class SignupDto {

    constructor(public readonly name: string, public readonly password: string) { }

    public static async validate(body: SignupDto) {
        if (!body.name) {
            throw new Error('Name is required')
        }
        if (!body.password) {
            throw new Error('Password is required')
        }
        return new SignupDto(body.name, body.password)
    }

}