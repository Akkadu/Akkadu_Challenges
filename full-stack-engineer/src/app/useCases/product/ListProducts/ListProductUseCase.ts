import Product from "../../../../domain/Product"
import { IProductRepository } from "../../../repositories/IProductRepository"
import { IListProductUseCase } from "./IListProductUseCase"

export default class ListProductsUseCase implements IListProductUseCase {


    private readonly productRepository: IProductRepository

    constructor(
        productRepository: IProductRepository
    ) {
        this.productRepository = productRepository
    }

    public async listProducts(): Promise<Product[]> {

        const products = await this.productRepository.getProducts()
        return products
    }

}