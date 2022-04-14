import mongoose from "mongoose";

export default interface IDeleteCommentUseCase {
    deleteComment(id: mongoose.Schema.Types.ObjectId ): Promise<void>
}