import Comment from "../../../../domain/Comment";
import { UpdateCommentDto } from "./IUpdateCommentDto";

export interface IUpdateCommentUseCase {
    updateComment(data: UpdateCommentDto): Promise<Comment | null>

}