import Comment from "../../../../domain/Comment";
import { ID } from "../../../../domain/shared/ID";

export interface IGetCommentUseCase {
    getComments(): Promise<Comment[]>
    getCommentById(commentId: ID): Promise<false | Comment>
}