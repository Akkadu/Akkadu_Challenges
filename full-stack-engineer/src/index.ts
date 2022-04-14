import 'reflect-metadata'
import './entrypoint/controllers/CommentController'
import './entrypoint/controllers/ProductController'

import dotenv from 'dotenv'
dotenv.config()
import { App } from './app/application'

export async function bootstrap() {
    new App({
        defaultScope: 'Singleton'
    })
}
bootstrap()

