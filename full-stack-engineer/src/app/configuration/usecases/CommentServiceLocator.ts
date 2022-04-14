import { inject, injectable } from "inversify"
import { ICommentRepository } from "../../repositories/ICommentRepository"
import CommentRepository from "../../../infra/CommentRepository"
import CreateCommentUseCase from "../../useCases/comment/CreateComment/CreateCommentUseCase"
import ListCommentUseCase from "../../useCases/comment/listProduct/ListCommentUseCase"
import DeleteCommentUseCase from "../../useCases/comment/DeleteComment/DeleteCommentUseCase"
import UpdateCommentUseCase from "../../useCases/comment/UpdateComment/UpdateCommentUseCase"

@injectable()
export default class CommentServiceLocator {

    constructor(@inject(CommentRepository)
    private commentRepository: ICommentRepository
    ) { }

    public GetCreateCommentUseCase() {

        return new CreateCommentUseCase(this.commentRepository)
    }

    public GetListCommentUseCase() {
        return new ListCommentUseCase(this.commentRepository)
    }

    public GetDeleteCommentUseCase() {
        return new DeleteCommentUseCase(this.commentRepository)
    }

    public GetUpdateCommentUseCase() {
        return new UpdateCommentUseCase(this.commentRepository)
    }
}