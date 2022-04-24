
export default class SigninDto {

    constructor(public readonly name: string, public readonly password: string) { }

    public static async validate(body: SigninDto) {
        if (!body.name) {
            throw new Error('Name is required')
        }
        if (!body.password) {
            throw new Error('Password is required')
        }
        return new SigninDto(body.name, body.password)
    }

}