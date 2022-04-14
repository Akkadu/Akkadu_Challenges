import Comment from "../../../../domain/Comment"
import { ICommentRepository } from "../../../repositories/ICommentRepository"
import { IListCommentUseCase } from "./IListCommentUseCase"

export default class GetCommentUseCase implements IListCommentUseCase {

    // implemented function needs productRepository
    // Driver (database) --> interface --> application (useCase) --> interface --> domain (product)

    private readonly commentRepository: ICommentRepository

    constructor(
        commentRepository: ICommentRepository
    ) {
        this.commentRepository = commentRepository
    }

    public async listComments(): Promise<Comment[]> {

        const comments = await this.commentRepository.getComments()

        const foundedComment = comments

        return foundedComment
    }

}