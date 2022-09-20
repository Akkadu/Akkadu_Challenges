import ProductsService from "~/services/products.service";

export default (ctx: any, inject: any) => {
  inject('productService', ProductsService(ctx.$axios))
}
