import 'reflect-metadata'
import ProductServiceLocator from "../app/configuration/usecases/CommentServiceLocator"
import ProductController from "../entrypoint/controllers/CommentController"
import ProductRepository from "../infra/CommentRepository"
describe("productController", () => {
    it("should be defined", () => {
        const sut = new ProductController(new ProductServiceLocator(new ProductRepository()))
        expect(sut).toBeDefined()
    })
})