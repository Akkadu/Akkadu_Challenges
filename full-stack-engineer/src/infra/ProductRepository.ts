import { injectable } from "inversify";
import { IProductRepository } from "../app/repositories/IProductRepository";
import Product from "../domain/Product";
import ProductModel from "./database/MongoDb/models/Product";

@injectable()
export default class ProductRepository implements IProductRepository {

    public async seedProducts(): Promise<void> {

        for (let i = 0; i < 11; i++) {

            await ProductModel.create({
                name: `Product ${i}`,
                description: `Description${i}`,
                rating: Math.floor(Math.random() * 10),
                img: "https://picsum.photos/500/500",
                comments: []
            })
        }

    }

    public async getProducts(): Promise<Product[]> {
        
        const products = await ProductModel.find()
        return products

    }
}