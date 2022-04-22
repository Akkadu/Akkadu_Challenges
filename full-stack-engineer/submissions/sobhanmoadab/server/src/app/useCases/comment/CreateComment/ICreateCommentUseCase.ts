import Comment from "../../../../domain/Comment";
import { ID } from "../../../../domain/shared/ID";
import { CreateCommentDto } from "./ICreateCommentDto";

export interface ICreateCommentUseCase {
    createComment(commentDto: CreateCommentDto, userId: ID): Promise<Comment>
}