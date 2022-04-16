import { ICreateCommentUseCase } from "./ICreateCommentUseCase";
import { ICommentRepository } from "../../../repositories/ICommentRepository";
import Comment from "../../../../domain/Comment";
import { CreateCommentDto } from "./ICreateCommentDto";
import { IProductRepository } from "../../../repositories/IProductRepository";

export default class CreateCommentUseCase implements ICreateCommentUseCase {

    // implemented function needs productRepository
    // Driver (database) --> interface --> application (useCase) --> interface --> domain (product)

    private readonly commentRepository: ICommentRepository
    private readonly productRepository: IProductRepository

    constructor(
        commentRepository: ICommentRepository,
        productRepository: IProductRepository
    ) {
        this.commentRepository = commentRepository
        this.productRepository = productRepository
    }

    public async createComment(commentDto: CreateCommentDto): Promise<Comment> {

        let comment = new Comment(commentDto.name, commentDto.rating, commentDto.content, commentDto.productId)
        const createdComment = await this.commentRepository.create(comment)
        await this.productRepository.pushComment(comment.productId, comment._id)
        return createdComment
    }

}