import Product from "../../../../domain/Product";
import { ID } from "../../../../domain/shared/ID";

export interface IGetProductUseCase {
    getProducts(): Promise<Product[]>
    getProductById(id: ID): Promise<Product | null>
}