import { Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, next, params, queryParam, request, requestParam, response } from "inversify-express-utils"
import { ObjectId } from "mongoose"
import CommentServiceLocator from "../../../app/configuration/usecases/CommentServiceLocator"
import { AuthMiddleware } from "../../../app/middleware/auth.middleware"
import { CreateCommentDto } from "../../../app/useCases/comment/CreateComment/ICreateCommentDto"
import { ICreateCommentUseCase } from "../../../app/useCases/comment/CreateComment/ICreateCommentUseCase"
import IDeleteCommentUseCase from "../../../app/useCases/comment/DeleteComment/IDeleteCommentUseCase"
import { IGetCommentUseCase } from "../../../app/useCases/comment/GetComment/IGetCommentUseCase"
import { UpdateCommentDto } from "../../../app/useCases/comment/UpdateComment/IUpdateCommentDto"
import { IUpdateCommentUseCase } from "../../../app/useCases/comment/UpdateComment/IUpdateCommentUseCase"
import { ID } from "../../../domain/shared/ID"

interface Req extends Request {
    userId: ID,

}
@controller('/api/v1/comments')
export default class CommentController implements interfaces.Controller {

    private readonly createCommentUseCase: ICreateCommentUseCase
    private readonly getCommentUseCase: IGetCommentUseCase
    private readonly deleteCommentUsecase: IDeleteCommentUseCase
    private readonly updateCommentUseCase: IUpdateCommentUseCase

    constructor(@inject(CommentServiceLocator)
    protected readonly serviceLocator: CommentServiceLocator
    ) {
        this.createCommentUseCase = serviceLocator.buildCreateCommentUseCase()
        this.getCommentUseCase = serviceLocator.buildGetCommentUseCase()
        this.deleteCommentUsecase = serviceLocator.buildDeleteCommentUseCase()
        this.updateCommentUseCase = serviceLocator.buildUpdateCommentUseCase()
    }

    @httpPost("/", AuthMiddleware())
    public async createComment(@request() req: Req, @response() res: Response) {
        try {
            const commentDto: CreateCommentDto = req.body
            const userId = req.userId
            const validated = await CreateCommentDto.validate(commentDto)
            const createdComment = await this.createCommentUseCase.createComment(validated, userId)
            return res.status(200).json({ status: 201, result: createdComment })

        } catch (err: any) {
            return res.status(400).json({ status: 500, err: err.message })
        }

    }
    @httpDelete("/", AuthMiddleware())
    public async deleteComment(@request() req: Req, @response() res: Response) {
        try {
            const commentId: any = req.query.commentId
            const userId = req.userId
            await this.deleteCommentUsecase.deleteComment(commentId, userId)
            return res.status(200).json({ status: 204, result: 'Comment deleted' })
        } catch (err: any) {
            return res.status(400).json({ status: 500, err: err.message })
        }
    }

    @httpGet('/')
    public async listComments(@request() req: Request, @response() res: Response) {
        try {
            const comments = await this.getCommentUseCase.getComments()
            return res.status(200).json({ status: 200, result: comments })
        } catch (err: any) {
            return res.status(400).json({ status: 500, err: err.message })
        }
    }

    @httpPut('/')
    public async updateComment(@request() req: Request, @response() res: Response) {
        try {
            const commentDto: UpdateCommentDto = req.body
            const validated = await UpdateCommentDto.validate(commentDto)
            const createdComment = await this.updateCommentUseCase.updateComment(validated)
            return res.status(200).json({ status: 201, result: createdComment })
        } catch (err: any) {
            return res.status(400).json({ status: 500, err: err.message })
        }
    }

}
