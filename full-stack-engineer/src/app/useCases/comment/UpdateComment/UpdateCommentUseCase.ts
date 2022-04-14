import Comment from "../../../../domain/Comment"
import { ICommentRepository } from "../../../repositories/ICommentRepository"
import { UpdateCommentDto } from "./IUpdateCommentDto"
import { IUpdateCommentUseCaser } from "./IUpdateCommentUseCase"


export default class UpdateCommentUseCase implements IUpdateCommentUseCaser {

    // implemented function needs productRepository
    // Driver (database) --> interface --> application (useCase) --> interface --> domain (product)

    private readonly commentRepository: ICommentRepository

    constructor(
        commentRepository: ICommentRepository
    ) {
        this.commentRepository = commentRepository
    }

    public async updateComment(commentDto: UpdateCommentDto): Promise<Comment | null> {

        const comment = new UpdateCommentDto(commentDto.id, commentDto.name, commentDto.rating, commentDto.content, commentDto.productId)

        const updatedComment = await this.commentRepository.updateComment(comment)

        return updatedComment
    }

}