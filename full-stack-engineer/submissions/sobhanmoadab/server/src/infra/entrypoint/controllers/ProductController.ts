import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import ProductServiceLocator from "../../../app/configuration/usecases/ProductServiceLocator";
import { IGetProductUseCase } from "../../../app/useCases/product/GetProducts/IGetProductUseCase";
import { ISeedProductsUseCase } from "../../../app/useCases/product/SeedProducts/ISeedProductUseCase";

@controller('/api/v1/product')
export default class ProductController implements interfaces.Controller {
    private readonly seedProductUseCase: ISeedProductsUseCase
    private readonly getProductUseCase: IGetProductUseCase

    constructor(@inject(ProductServiceLocator)
    protected readonly serviceLocator: ProductServiceLocator
    ) {
        this.seedProductUseCase = serviceLocator.buildSeedProductsUseCase()
        this.getProductUseCase = serviceLocator.buildGetProductsUseCase()
    }

    @httpGet('/seed')
    public async seedProducts(@request() req: Request, @response() res: Response) {
        try {

            await this.seedProductUseCase.seedProducts()
            return res.status(200).json({ status: 200, result: 'Seeded successfully' })

        } catch (err) {
            console.log({ err })
            return res.status(500).json({ status: 500, result: 'Something went wrong' })
        }
    }

    @httpGet('/')
    public async getProducts(@request() req: Request, @response() res: Response) {
        try {

            const products = await this.getProductUseCase.getProducts()
            return res.status(200).json({ status: 200, result: products })

        } catch (err) {
            console.log({ err })
            return res.status(500).json({ status: 500, result: 'Something went wrong' })
        }
    }

    @httpGet('/by-id')
    public async getProductById(@request() req: Request, @response() res: Response) {
        try {
            const productId: any = req.query.productId
            const product = await this.getProductUseCase.getProductById(productId)
            return res.status(200).json({ status: 200, result: product })

        } catch (e: any) {
            return res.status(500).json({ status: 500, result: 'Something went wrong' })
        }


    }

}