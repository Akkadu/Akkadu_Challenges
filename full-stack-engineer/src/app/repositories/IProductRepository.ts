import Product from "../../domain/Product";

export interface IProductRepository {

    seedProducts(): Promise<void>
    getProducts(): Promise<Product[]>
}