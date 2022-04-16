import Comment from "../../domain/Comment";
import { ID } from "../../domain/shared/ID";
import { UpdateCommentDto } from "../useCases/comment/UpdateComment/IUpdateCommentDto";
export interface ICommentRepository {

    create(comment: Comment): Promise<Comment>

    deleteComment(commentId: ID): Promise<Comment | {}>

    getComments(): Promise<Comment[]>

    updateComment(data: UpdateCommentDto): Promise<Comment | null>

    getCommentById(commentId: ID): Promise<Comment | false>
}