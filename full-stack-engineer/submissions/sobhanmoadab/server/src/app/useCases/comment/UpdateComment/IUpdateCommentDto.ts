import mongoose from "mongoose"

export class UpdateCommentDto {

    constructor(public readonly id: mongoose.Schema.Types.ObjectId, public readonly name?: string, public readonly rating?: number, public readonly content?: string, public readonly productId?: mongoose.Schema.Types.ObjectId) { }

    public static async validate(body: UpdateCommentDto) {
        if (!body.id) {
            throw new Error('Id is required and must be mongoose object id')
        }
        if (body.content && typeof body.content !== 'string') {
            throw new Error('Content must be string')
        }
        if (body.rating && typeof body.rating !== 'number') {
            throw new Error('Rating must be number')
        }
        if (body.productId && !mongoose.isValidObjectId(body.productId)) {
            throw new Error('ProductID must be mongoose object id')
        }
        return new UpdateCommentDto(body.id, body.name, body.rating, body.content, body.productId)
    }

}