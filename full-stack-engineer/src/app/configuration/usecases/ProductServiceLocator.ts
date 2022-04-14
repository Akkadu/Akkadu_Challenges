import { inject, injectable } from "inversify";
import ProductRepository from "../../../infra/ProductRepository";
import { IProductRepository } from "../../repositories/IProductRepository";
import SeedProductsUseCase from "../../useCases/product/SeedProducts/SeedProductUseCase";
import ListProductUseCase from '../../useCases/product/ListProducts/ListProductUseCase'
@injectable()
export default class ProductServiceLocator {
    constructor(@inject(ProductRepository) private productRepository: IProductRepository) { }


    public GetSeedProductsUseCase() {

        return new SeedProductsUseCase(this.productRepository)
    }

    public GetListProductsUseCase() {
        return new ListProductUseCase(this.productRepository)
    }
}