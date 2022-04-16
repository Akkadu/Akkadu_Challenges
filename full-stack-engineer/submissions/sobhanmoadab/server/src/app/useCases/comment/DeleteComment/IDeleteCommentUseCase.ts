import Comment from "../../../../domain/Comment";
import { ID } from "../../../../domain/shared/ID";

export default interface IDeleteCommentUseCase {

    deleteComment(productId: ID, commentId: ID): Promise<void | false>
}