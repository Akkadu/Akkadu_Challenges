import Product from "../../../../domain/Product"
import { ID } from "../../../../domain/shared/ID"
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

    public async getProductById(id: ID): Promise<Product | null> {
        const product = await this.productRepository.getProductById(id)
        return product
    }

}