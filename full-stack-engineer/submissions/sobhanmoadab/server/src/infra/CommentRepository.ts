import { injectable } from "inversify";
import mongoose from "mongoose";
import { ICommentRepository } from "../app/repositories/ICommentRepository";
import { UpdateCommentDto } from "../app/useCases/comment/UpdateComment/IUpdateCommentDto";
import Comment from "../domain/Comment";
import { ID } from "../domain/shared/ID";
import CommentModel from "./database/MongoDb/models/Comment";


@injectable()
export default class CommentRepository implements ICommentRepository {

    public async create(comment: Comment): Promise<Comment> {
        console.log({comment})
        const createdComment = await CommentModel.create(comment)
        return createdComment
    }

    public async deleteComment(commentId: ID): Promise<Comment | {}> {

        const foundedComment = await CommentModel.findByIdAndDelete(commentId)
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

    public async getCommentById(id: ID): Promise<false | Comment> {

        const foundedComment = await CommentModel.findById(id)
        return foundedComment ? foundedComment : false
    }

}