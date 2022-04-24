import { IProductRepository } from "../../../repositories/IProductRepository"
import { ISeedProductsUseCase } from "./ISeedProductUseCase"

export default class SeedProductsUseCase implements ISeedProductsUseCase {

    // implemented function needs productRepository
    // Driver (database) --> interface --> application (useCase) --> interface --> domain (product)

    private readonly productRepository: IProductRepository

    constructor(
        productRepository: IProductRepository
    ) {
        this.productRepository = productRepository
    }

    public async seedProducts(): Promise<void> {

        await this.productRepository.seedProducts()
    }

}