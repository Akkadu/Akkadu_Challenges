import { injectable } from "inversify";
import { IProductRepository } from "../app/repositories/IProductRepository";
import { UpdateProductDto } from "../app/useCases/product/UpdateProduct/IUpdateProductDto";
import Comment from "../domain/Comment";
import Product from "../domain/Product";
import { ID } from "../domain/shared/ID";
import ProductModel from "./database/MongoDb/models/Product";

@injectable()
export default class ProductRepository implements IProductRepository {

    public async seedProducts(): Promise<void> {

        for (let i = 0; i < 11; i++) {

            await ProductModel.create({
                name: `Product ${i}`,
                description: `Description${i}`,
                rating: Math.floor((Math.abs(Math.random() - 0.5)) * 10),
                img: "https://picsum.photos/500/500",
                comments: []
            })
        }

    }

    public async getProducts(): Promise<Product[]> {

        const products = await ProductModel.find().populate('comments')
        return products

    }

    public async updateProduct(id: ID, data: Partial<UpdateProductDto>): Promise<Product | null> {

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, { new: true })
        return updatedProduct
    }

    public async pullComment(productId: ID, commentId: ID): Promise<void> {

        console.log({ commentId })
        console.log({ productId })

        await ProductModel.findByIdAndUpdate(productId, { $pull: { comments: commentId } })

    }

    public async pushComment(productId: ID, commentId: ID): Promise<void> {
        await ProductModel.findByIdAndUpdate(productId, {
            $push: {
                comments: commentId
            }

        })

    }
}