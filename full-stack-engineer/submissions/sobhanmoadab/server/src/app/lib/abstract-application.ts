import { Container, interfaces } from "inversify";

export default abstract class Application {
    protected readonly container: Container

    constructor(options: interfaces.ContainerOptions){
        this.container = new Container(options)
        this.setup()
    }
    abstract setup(): Promise<void> | void
}