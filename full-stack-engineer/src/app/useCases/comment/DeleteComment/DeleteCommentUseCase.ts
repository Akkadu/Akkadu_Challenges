import mongoose from "mongoose";
import { ICommentRepository } from "../../../repositories/ICommentRepository";
import IDeleteCommentUseCase from "./IDeleteCommentUseCase";

export default class DeleteCommentUseCase implements IDeleteCommentUseCase {

    private readonly commentRepository: ICommentRepository

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository
    }

    public async deleteComment(id: mongoose.Schema.Types.ObjectId): Promise<void> {

        await this.commentRepository.deleteComment(id)

    }
}