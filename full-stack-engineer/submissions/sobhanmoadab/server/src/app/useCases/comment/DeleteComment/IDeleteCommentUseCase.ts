import Comment from "../../../../domain/Comment";
import { ID } from "../../../../domain/shared/ID";

export default interface IDeleteCommentUseCase {

    deleteComment(commentId: ID, userId: ID): Promise<void | false>
}