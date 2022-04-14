import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import cors from 'cors'
import * as express from 'express'

import { container } from "./container";
import Application from "./lib/abstract-application";

import CommentServiceLocator from "./configuration/usecases/CommentServiceLocator";
import ProductServiceLocator from "./configuration/usecases/ProductServiceLocator";

import ProductRepository from "../infra/ProductRepository";
import CommentRepository from "../infra/CommentRepository";

import { DbContext } from "../infra/database/MongoDb/db.context";

export class App extends Application {


    configureServices(container: Container): void {
        container.bind(CommentServiceLocator).toSelf()
        container.bind(ProductServiceLocator).toSelf()
        container.bind(CommentRepository).toSelf()
        container.bind(ProductRepository).toSelf()
        container.bind(DbContext).toSelf()
    }


    async setup(): Promise<void> {

        const _db = container.get(DbContext)

        await _db.connect()

        const server = new InversifyExpressServer(container)


        server.setConfig((app) => {
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }))
            app.use(cors())


        })
        const app = server.build()

        app.listen(process.env.PORT, () => {
            console.log(
                `server is running on port ${process.env.PORT}`
            )
        })
    }

}