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

    public async deleteComment(commentId: ID, userId: ID): Promise<void> {
        console.log({commentId, userId})
        const foundedComment = await this.commentRepository.getCommentById(commentId)
        if (!foundedComment) throw new Error('Could not find comment')
        if (foundedComment.userId != userId) throw new Error('You can only modify your comments')
        await this.commentRepository.deleteComment(commentId)
        await this.productRepository.pullComment(foundedComment.productId, commentId)
    }


}