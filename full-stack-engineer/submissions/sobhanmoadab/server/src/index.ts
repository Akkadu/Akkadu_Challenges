import 'reflect-metadata'
import './infra/entrypoint/controllers/CommentController'
import './infra/entrypoint/controllers/ProductController'

import dotenv from 'dotenv'
dotenv.config()
import { App } from './app/application'

export async function bootstrap() {
    new App({
        defaultScope: 'Singleton'
    })
}
bootstrap()

