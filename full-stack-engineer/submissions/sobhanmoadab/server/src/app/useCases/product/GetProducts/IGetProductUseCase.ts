import Product from "../../../../domain/Product";

export interface IGetProductUseCase {
    getProducts(): Promise<Product[]>
}