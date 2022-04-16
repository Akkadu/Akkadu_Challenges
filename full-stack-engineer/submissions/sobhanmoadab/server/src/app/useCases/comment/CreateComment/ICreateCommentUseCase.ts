import Comment from "../../../../domain/Comment";
import { CreateCommentDto } from "./ICreateCommentDto";

export interface ICreateCommentUseCase {
    createComment(commentDto: CreateCommentDto): Promise<Comment>
}