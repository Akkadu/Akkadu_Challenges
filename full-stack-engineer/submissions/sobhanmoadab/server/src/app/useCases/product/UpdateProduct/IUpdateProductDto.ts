import mongoose from "mongoose"
import Comment from "../../../../domain/Comment"

export class UpdateProductDto {

    constructor(public readonly name?: string, public readonly rating?: number, public readonly description?: string, public readonly img?: mongoose.Schema.Types.ObjectId, public readonly comments?: Comment[]) { }

    public static async validate(body: UpdateProductDto) {
       
        if (body.name && typeof body.name !== 'string') {
            throw new Error('Name must be string')
        }
        if (body.rating && typeof body.rating !== 'number') {
            throw new Error('Rating must be number')
        }
        if (body.description && typeof body.description !== 'string') {
            throw new Error('description must be string')
        }

        if (body.img && typeof body.img !== 'string') {
            throw new Error('img must be string')
        }
        return new UpdateProductDto(body.name, body.rating, body.description, body.img, body.comments)
    }

}