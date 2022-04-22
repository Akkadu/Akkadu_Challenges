import User from "../../domain/User";

export interface IUserRepository {

    createUser(user: User): Promise<User>
    updateUser(user: User): Promise<void> 
    findUser(user: User): Promise<User | null>
    findUserById(id: string) : Promise<User | null>
}
