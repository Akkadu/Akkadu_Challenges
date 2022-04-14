import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import ProductServiceLocator from "../../app/configuration/usecases/ProductServiceLocator";
import { IListProductUseCase } from "../../app/useCases/product/ListProducts/IListProductUseCase";
import { ISeedProductsUseCase } from "../../app/useCases/product/SeedProducts/ISeedProductUseCase";

@controller('/api/v1/product')
export default class ProductController implements interfaces.Controller {
    private readonly seedProductUseCase: ISeedProductsUseCase
    private readonly listProductUseCase: IListProductUseCase

    constructor(@inject(ProductServiceLocator)
    protected readonly serviceLocator: ProductServiceLocator
    ) {
        this.seedProductUseCase = serviceLocator.GetSeedProductsUseCase()
        this.listProductUseCase = serviceLocator.GetListProductsUseCase()
    }

    @httpGet('/seed')
    public async seedProducts(@request() req: Request, @response() res: Response) {
        try {

            await this.seedProductUseCase.seedProducts()
            return res.status(200).json({ status: 'sucess', result: 'Seeded successfully' })

        } catch (err) {
            console.log({ err })
            return res.status(500).json({ status: 'fail', result: 'Something went wrong' })
        }
    }

    @httpGet('/')
    public async listProducts(@request() req: Request, @response() res: Response) {
        try {

            const products = await this.listProductUseCase.listProducts()
            return res.status(200).json({ status: 'success', result: products })

        } catch (err) {
            console.log({ err })
            return res.status(500).json({ status: 'fail', result: 'Something went wrong' })
        }
    }

}