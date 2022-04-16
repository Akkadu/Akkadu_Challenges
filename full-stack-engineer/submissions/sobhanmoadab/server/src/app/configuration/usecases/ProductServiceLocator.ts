import { inject, injectable } from "inversify";
import ProductRepository from "../../../infra/ProductRepository";
import { IProductRepository } from "../../repositories/IProductRepository";
import SeedProductsUseCase from "../../useCases/product/SeedProducts/SeedProductUseCase";
import GetProductUseCase from '../../useCases/product/GetProducts/GetProductUseCase'
import UpdateProductUseCase from '../../useCases/product/UpdateProduct/UpdateProductUseCase'
@injectable()
export default class ProductServiceLocator {
    constructor(@inject(ProductRepository) private productRepository: IProductRepository) { }


    public buildSeedProductsUseCase() {

        return new SeedProductsUseCase(this.productRepository)
    }

    public buildGetProductsUseCase() {
        return new GetProductUseCase(this.productRepository)
    }

    public buildUpdateProductUseCase(){
        return new UpdateProductUseCase(this.productRepository)
    }
}