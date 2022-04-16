import { inject, injectable } from "inversify"
import { ICommentRepository } from "../../repositories/ICommentRepository"
import CommentRepository from "../../../infra/CommentRepository"
import CreateCommentUseCase from "../../useCases/comment/CreateComment/CreateCommentUseCase"
import GetCommentUseCase from "../../useCases/comment/GetComment/GetCommentUseCase"
import DeleteCommentUseCase from "../../useCases/comment/DeleteComment/DeleteCommentUseCase"
import UpdateCommentUseCase from "../../useCases/comment/UpdateComment/UpdateCommentUseCase"
import ProductRepository from "../../../infra/ProductRepository"
import { IProductRepository } from "../../repositories/IProductRepository"

@injectable()
export default class CommentServiceLocator {

    constructor(
        @inject(CommentRepository) private commentRepository: ICommentRepository,
        @inject(ProductRepository) private productRepository: IProductRepository
    ) { }

    public buildCreateCommentUseCase() {

        return new CreateCommentUseCase(this.commentRepository, this.productRepository)
    }

    public buildGetCommentUseCase() {
        return new GetCommentUseCase(this.commentRepository)
    }

    public buildDeleteCommentUseCase() {
        return new DeleteCommentUseCase(this.commentRepository, this.productRepository)
    }

    public buildUpdateCommentUseCase() {
        return new UpdateCommentUseCase(this.commentRepository)
    }
}