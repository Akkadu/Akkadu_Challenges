import mongoose from "mongoose"
import { ID } from "../../../../domain/shared/ID"

export class CreateCommentDto {

    constructor(public readonly name: string, public readonly rating: number, public readonly content: string, public readonly productId: ID) { }

    public static async validate(body: CreateCommentDto) {
        if (!body.name) {
            throw new Error('Name is required')
        }
        if (!body.content) {
            throw new Error('Content is required')
        }
        if (!body.rating || typeof body.rating !== 'number') {
            throw new Error('Rating is required and must be number')
        }
        if (!body.productId) {
            throw new Error('ProductID is required')
        }
        return new CreateCommentDto(body.name, body.rating, body.content, body.productId)
    }

}