import { Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, params, queryParam, request, requestParam, response } from "inversify-express-utils"
import mongoose from "mongoose"
import CommentServiceLocator from "../../../app/configuration/usecases/CommentServiceLocator"
import ProductServiceLocator from "../../../app/configuration/usecases/ProductServiceLocator"
import { CreateCommentDto } from "../../../app/useCases/comment/CreateComment/ICreateCommentDto"
import { ICreateCommentUseCase } from "../../../app/useCases/comment/CreateComment/ICreateCommentUseCase"
import IDeleteCommentUseCase from "../../../app/useCases/comment/DeleteComment/IDeleteCommentUseCase"
import { IGetCommentUseCase } from "../../../app/useCases/comment/GetComment/IGetCommentUseCase"
import { UpdateCommentDto } from "../../../app/useCases/comment/UpdateComment/IUpdateCommentDto"
import { IUpdateCommentUseCase } from "../../../app/useCases/comment/UpdateComment/IUpdateCommentUseCase"

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

    @httpPost("/")
    public async createComment(@request() req: Request, @response() res: Response) {
        try {
            const commentDto: CreateCommentDto = req.body

            const validated = await CreateCommentDto.validate(commentDto)
            const createdComment = await this.createCommentUseCase.createComment(validated)
            return res.status(200).json({ status: 200, result: createdComment })

        } catch (err: any) {
            return res.status(400).json({ status: 500, err: err.message })
        }

    }
    @httpDelete("/")
    public async deleteComment(@queryParam() query: any, @response() res: Response) {
        try {
            const { commentId } = query
            if (!commentId) throw new Error('commentId is required')
            const foundedComment = await this.getCommentUseCase.getCommentById(query.commentId)
            if (!foundedComment) throw new Error('Could not find comment')
            await this.deleteCommentUsecase.deleteComment(foundedComment.productId, commentId)
            return res.status(200).json({ status: 200, result: 'Comment deleted' })
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
            return res.status(200).json({ status: 200, result: createdComment })
        } catch (err: any) {
            return res.status(400).json({ status: 500, err: err.message })
        }
    }

}
