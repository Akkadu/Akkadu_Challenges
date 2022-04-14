import { injectable } from "inversify";
import mongoose from "mongoose";
import { ICommentRepository } from "../app/repositories/ICommentRepository";
import { UpdateCommentDto } from "../app/useCases/comment/UpdateComment/IUpdateCommentDto";
import Comment from "../domain/Comment";
import CommentModel from "./database/MongoDb/models/Comment";


@injectable()
export default class CommentRepository implements ICommentRepository {

    public async create(comment: Comment): Promise<Comment> {
        const createdComment = await CommentModel.create(comment)
        return createdComment
    }

    public async deleteComment(id: mongoose.Schema.Types.ObjectId): Promise<Comment | {}> {

        const foundedComment = await CommentModel.findByIdAndDelete(id)
        if (foundedComment === null) return {}
        else return foundedComment

    }

    public async getComments(): Promise<Comment[]> {

        const foundedComments = await CommentModel.find()
        return foundedComments
    }

    public async updateComment(comment: UpdateCommentDto): Promise<Comment | null> {
        const { id, ...data } = comment
        const updatedComment = await CommentModel.findByIdAndUpdate(id, data, { new: true })
        return updatedComment
    }

}