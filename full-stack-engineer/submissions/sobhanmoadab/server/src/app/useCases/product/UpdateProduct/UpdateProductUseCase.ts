import Comment from "../../../../domain/Comment"
import Product from "../../../../domain/Product"
import { ID } from "../../../../domain/shared/ID"
import { ICommentRepository } from "../../../repositories/ICommentRepository"
import { IProductRepository } from "../../../repositories/IProductRepository"
import { UpdateProductDto } from "./IUpdateProductDto"
import { IUpdateProductUseCase } from "./IUpdateProductUseCase"


export default class UpdateProductUseCase implements IUpdateProductUseCase {

    // implemented function needs productRepository
    // Driver (database) --> interface --> application (useCase) --> interface --> domain (product)

    private readonly productRepository: IProductRepository

    constructor(
        productRepository: IProductRepository
    ) {
        this.productRepository = productRepository
    }

    public async updateProduct(productId: ID, productDto: UpdateProductDto): Promise<Product | null> {

        const product = new UpdateProductDto(productDto.name, productDto.rating, productDto.description, productDto.img, productDto.comments)

        const updatedProduct = await this.productRepository.updateProduct(productId, product)

        return updatedProduct
    }

    public async pullComment(productId: ID, commentId: ID): Promise<void> {

        await this.productRepository.pullComment(productId, commentId)
    }

}