import mongoose from "mongoose";
import Comment from "../../domain/Comment";
import { UpdateCommentDto } from "../useCases/comment/UpdateComment/IUpdateCommentDto";

export interface ICommentRepository {

    create(comment: Comment): Promise<Comment>

    deleteComment(id: mongoose.Schema.Types.ObjectId): Promise<Comment | {}>

    getComments(): Promise<Comment[]>

    updateComment(data: UpdateCommentDto): Promise<Comment | null>
}