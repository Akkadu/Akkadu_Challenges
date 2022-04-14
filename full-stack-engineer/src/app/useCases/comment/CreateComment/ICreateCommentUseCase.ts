import { CreateCommentDto } from "./ICreateCommentDto";

export interface ICreateCommentUseCase {
    createComment(productDto: CreateCommentDto): Promise<CreateCommentDto>
}