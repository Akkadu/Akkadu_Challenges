import Product from "../../../../domain/Product";
import { ID } from "../../../../domain/shared/ID";
import { UpdateProductDto } from "./IUpdateProductDto";

export interface IUpdateProductUseCase {
    updateProduct(productId: ID, data: UpdateProductDto): Promise<Product | null>

    pullComment(commentId: ID, productId: ID): Promise<void>
}