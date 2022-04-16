import Comment from "../../domain/Comment";
import Product from "../../domain/Product";
import { ID } from "../../domain/shared/ID";
import { UpdateProductDto } from "../useCases/product/UpdateProduct/IUpdateProductDto";

export interface IProductRepository {

    seedProducts(): Promise<void>
    getProducts(): Promise<Product[]>
    updateProduct(id: ID, update: Partial<UpdateProductDto>): Promise<Product | null>
    pullComment(productId: ID, commentId: ID): Promise<void>
    pushComment(productId: ID, commentId: ID): Promise<void>
}
