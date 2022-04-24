import Comment from "../../../../domain/Comment"
import { ID } from "../../../../domain/shared/ID"
import { ICommentRepository } from "../../../repositories/ICommentRepository"
import { IGetCommentUseCase } from "./IGetCommentUseCase"

export default class GetCommentUseCase implements IGetCommentUseCase {

    private readonly commentRepository: ICommentRepository

    constructor(
        commentRepository: ICommentRepository
    ) {
        this.commentRepository = commentRepository
    }

    public async getComments(): Promise<Comment[]> {

        const comments = await this.commentRepository.getComments()

        const foundedComment = comments

        return foundedComment
    }

    public async getCommentById(id: ID): Promise<false | Comment> {

        const comment = await this.commentRepository.getCommentById(id)

        const foundedComment = comment

        return foundedComment? foundedComment : false

    }
}