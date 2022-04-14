import { Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, params, queryParam, request, requestParam, response } from "inversify-express-utils"
import mongoose from "mongoose"
import CommentServiceLocator from "../../app/configuration/usecases/CommentServiceLocator"
import ProductServiceLocator from "../../app/configuration/usecases/ProductServiceLocator"
import { CreateCommentDto } from "../../app/useCases/comment/CreateComment/ICreateCommentDto"
import { ICreateCommentUseCase } from "../../app/useCases/comment/CreateComment/ICreateCommentUseCase"
import IDeleteCommentUseCase from "../../app/useCases/comment/DeleteComment/IDeleteCommentUseCase"
import { IListCommentUseCase } from "../../app/useCases/comment/listProduct/IListCommentUseCase"
import { UpdateCommentDto } from "../../app/useCases/comment/UpdateComment/IUpdateCommentDto"
import { IUpdateCommentUseCase } from "../../app/useCases/comment/UpdateComment/IUpdateCommentUseCase"
// import { ValidateRequestMiddleware } from "../../app/middleware/validate-request.middleware"

declare type QueryParam = {
    id: mongoose.Schema.Types.ObjectId
}

@controller('/api/v1/comments')
export default class CommentController implements interfaces.Controller {

    private readonly createCommentUseCase: ICreateCommentUseCase
    private readonly listCommentUseCase: IListCommentUseCase
    private readonly deleteCommentUsecase: IDeleteCommentUseCase
    private readonly updateCommentUseCase: IUpdateCommentUseCase
    // private readonly updateProductUseCase: IUpdateProductUseCase

    constructor(@inject(CommentServiceLocator)
    protected readonly serviceLocator: CommentServiceLocator
    ) {
        this.createCommentUseCase = serviceLocator.GetCreateCommentUseCase()
        this.listCommentUseCase = serviceLocator.GetListCommentUseCase()
        this.deleteCommentUsecase = serviceLocator.GetDeleteCommentUseCase()
        this.updateCommentUseCase = serviceLocator.GetUpdateCommentUseCase()
    }

    @httpPost("/")
    public async createComment(@request() req: Request, @response() res: Response) {
        try {
            const commentDto: CreateCommentDto = req.body
            const validated = await CreateCommentDto.validate(commentDto)
            const createdComment = await this.createCommentUseCase.createComment(validated)
            return res.status(200).json({ status: 'success', result: createdComment })
        } catch (err: any) {
            return res.status(400).json({ status: 'fail', err: err.message })
        }

    }
    @httpDelete("/")
    public async deleteComment(@queryParam() query: QueryParam, @response() res: Response) {
        try {
            if (!query.id || !mongoose.isValidObjectId(query.id)) throw new Error('Id is either not provided or is not mongoose object id')
            await this.deleteCommentUsecase.deleteComment(query.id)
            return res.status(200).json({ status: 'success', result: 'Comment deleted' })
        } catch (err: any) {
            return res.status(400).json({ status: 'fail', err: err.message })
        }
    }

    @httpGet('/')
    public async listComments(@request() req: Request, @response() res: Response) {
        try {
            const comments = await this.listCommentUseCase.listComments()
            return res.status(200).json({ status: 'success', result: comments })
        } catch (err: any) {
            return res.status(400).json({ status: 'fail', err: err.message })
        }
    }

    @httpPut('/')
    public async updateComment(@request() req: Request, @response() res: Response) {
        try {
            const commentDto: UpdateCommentDto = req.body
            const validated = await UpdateCommentDto.validate(commentDto)
            const createdComment = await this.updateCommentUseCase.updateComment(validated)
            return res.status(200).json({ status: 'success', result: createdComment })
        } catch (err: any) {
            return res.status(400).json({ status: 'fail', err: err.message })
        }
    }

}
