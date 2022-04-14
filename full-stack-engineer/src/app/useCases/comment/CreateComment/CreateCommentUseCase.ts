import { ICreateCommentUseCase } from "./ICreateCommentUseCase";
import { ICommentRepository } from "../../../repositories/ICommentRepository";
import Comment from "../../../../domain/Comment";
import { CreateCommentDto } from "./ICreateCommentDto";

export default class CreateCommentUseCase implements ICreateCommentUseCase {

    // implemented function needs productRepository
    // Driver (database) --> interface --> application (useCase) --> interface --> domain (product)

    private readonly commentRepository: ICommentRepository

    constructor(
        commentRepository: ICommentRepository
    ) {
        this.commentRepository = commentRepository
    }

    public async createComment(commentDto: CreateCommentDto): Promise<CreateCommentDto> {

        let comment = new Comment(commentDto.name, commentDto.rating, commentDto.content, commentDto.productId)

        comment = await this.commentRepository.create(comment)

        const createdComment = comment

        return createdComment
    }

}