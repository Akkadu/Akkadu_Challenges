import { DbContext } from "../infra/database/MongoDb/db.context";
import { Container } from "inversify";

import CommentRepository from "../infra/CommentRepository";
import CommentServiceLocator from "./configuration/usecases/CommentServiceLocator";
import ProductServiceLocator from "./configuration/usecases/ProductServiceLocator";
import ProductRepository from "../infra/ProductRepository";

export const container = new Container({
    defaultScope: 'Singleton'
})

container.bind(ProductServiceLocator).toSelf()
container.bind(ProductRepository).toSelf()

container.bind(CommentRepository).toSelf()
container.bind(CommentServiceLocator).toSelf()

container.bind(DbContext).toSelf()