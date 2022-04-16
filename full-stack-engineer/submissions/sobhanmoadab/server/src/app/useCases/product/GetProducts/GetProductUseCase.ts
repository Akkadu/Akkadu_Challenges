import Product from "../../../../domain/Product"
import { IProductRepository } from "../../../repositories/IProductRepository"
import { IGetProductUseCase } from "./IGetProductUseCase"

export default class GetProductsUseCase implements IGetProductUseCase {


    private readonly productRepository: IProductRepository

    constructor(
        productRepository: IProductRepository
    ) {
        this.productRepository = productRepository
    }

    public async getProducts(): Promise<Product[]> {

        const products = await this.productRepository.getProducts()
        return products
    }

}