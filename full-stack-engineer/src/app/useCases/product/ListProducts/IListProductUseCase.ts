import Product from "../../../../domain/Product";

export interface IListProductUseCase {
    listProducts(): Promise<Product[]>
}