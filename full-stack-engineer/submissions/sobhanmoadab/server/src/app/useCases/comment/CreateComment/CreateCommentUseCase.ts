import { ICreateCommentUseCase } from "./ICreateCommentUseCase";
import { ICommentRepository } from "../../../repositories/ICommentRepository";
import Comment from "../../../../domain/Comment";
import { CreateCommentDto } from "./ICreateCommentDto";
import { IProductRepository } from "../../../repositories/IProductRepository";
import { ID } from "../../../../domain/shared/ID";

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

    public async createComment(commentDto: CreateCommentDto, userId: ID): Promise<Comment> {
        const foundedProduct = await this.productRepository.getProductById(commentDto.productId)
        if(!foundedProduct) throw new Error('Could not find product')
        const alreadyCommented = foundedProduct.comments.find((c) => c.userId == userId)
        console.log({alreadyCommented})
        if(alreadyCommented) throw new Error('You already submitted a review')
        let comment = new Comment(commentDto.name, commentDto.rating, commentDto.content, commentDto.productId, userId)
        const createdComment = await this.commentRepository.create(comment)
        await this.productRepository.pushComment(comment.productId, comment._id)
        return createdComment
    }

}