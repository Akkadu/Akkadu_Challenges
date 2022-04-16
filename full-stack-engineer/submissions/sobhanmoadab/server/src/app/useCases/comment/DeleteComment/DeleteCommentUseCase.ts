import { ID } from "../../../../domain/shared/ID";
import { ICommentRepository } from "../../../repositories/ICommentRepository";
import { IProductRepository } from "../../../repositories/IProductRepository";
import IDeleteCommentUseCase from "./IDeleteCommentUseCase";

export default class DeleteCommentUseCase implements IDeleteCommentUseCase {

    private readonly commentRepository: ICommentRepository
    private readonly productRepository: IProductRepository

    constructor(commentRepository: ICommentRepository, productRepository: IProductRepository) {
        this.commentRepository = commentRepository
        this.productRepository = productRepository
    }

    public async deleteComment(productId: ID, commentId: ID): Promise<void> {

        await this.commentRepository.deleteComment(commentId)
        await this.productRepository.pullComment(productId, commentId)
    }


}