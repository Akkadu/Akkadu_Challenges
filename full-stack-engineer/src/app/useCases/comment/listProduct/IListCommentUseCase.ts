import Comment from "../../../../domain/Comment";

export interface IListCommentUseCase {
    listComments(): Promise<Comment[]>
}