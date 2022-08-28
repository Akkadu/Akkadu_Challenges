<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-primary mt-4"
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
        >
          Create Product
        </button>
      </div>
      <div class="row align-items-center mt-4">
        <div v-for="product in products" :key="product.id" class="col-md-4">
          <div class="card p-3 m-2 w-100">
            <div class="d-flex justify-content-between align-items-center">
              <div class="mt-2">
                <h4 class="text-uppercase">{{ product.vendor }}</h4>
                <div class="mt-2">
                  <h1 class="main-heading mt-0">{{ product.name }}</h1>
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="ratings">
                      <fa-icon
                        v-for="i in product.averageStars"
                        :key="i"
                        icon="star"
                        regular
                        class="text-warning"
                      ></fa-icon>
                      <fa-icon
                        v-for="i in 5 - (product?.averageStars || 0)"
                        :key="'_' + i"
                        :icon="['far', 'star']"
                        regular
                        class="text-primary"
                      ></fa-icon>
                    </div>
                  </div>
                  <div>
                    <nuxt-link :to="'products/' + product.id + '/reviews'"
                      >{{ product.reviewsCount }} Reviews</nuxt-link
                    >
                  </div>
                </div>
              </div>
            </div>

            <p class="fs-5 fw-bolder">USD {{ product.price }}</p>
            <div class="d-flex">
              <div class="flex-grow-1">
                <button class="btn btn-primary w-100">Add to cart</button>
              </div>
              <button
                class="btn btn-success mx-2"
                data-bs-toggle="modal"
                data-bs-target="#addReviewModal"
                @click="setCurrentProduct(product)"
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      id="addReviewModal"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="Add review"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="mt-2 mr-4">
              <h1 class="main-heading mt-0">Review the product</h1>
              <div class="row mt-4">
                <div class="ratings">
                  <fa-icon
                    v-for="star in maxStars"
                    :key="'_' + star"
                    :class="{ active: star <= review.stars }"
                    :icon="[star <= review.stars ? 'fas' : 'far', 'star']"
                    class="star fa-2x"
                    @click="review.stars = star"
                  ></fa-icon>
                </div>
              </div>
              <div>
                <div class="form">
                  <fieldset class="mt-4">
                    <div class="form-floating mb-3">
                      <textarea
                        id="comment"
                        v-model="review.comment"
                        class="form-control form-control-lg fw-bold text-dark border-1"
                        name="comment"
                        placeholder="Add your review"
                        rows="3"
                      />
                      <label for="comment">Write review</label>
                    </div>
                  </fieldset>
                </div>
                <div>
                  <div class="modal-footer border-top-0">
                    <button
                      ref="CloseReview"
                      type="button"
                      class="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="publishReview()"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="addProductModal"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="Add Product"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="mt-2 mr-4">
              <h1 class="main-heading mt-0">Create the product</h1>
              <div>
                <div class="form">
                  <fieldset class="mt-4">
                    <div class="form-floating mb-3">
                      <input
                        id="name"
                        v-model="newProduct.name"
                        class="form-control form-control-lg fw-bold text-dark border-1"
                        name="name"
                        placeholder="Name"
                        rows="3"
                      />
                      <label for="name">Name</label>
                    </div>
                  </fieldset>
                  <fieldset class="mt-4">
                    <div class="form-floating mb-3">
                      <input
                        id="price"
                        v-model="newProduct.price"
                        class="form-control form-control-lg fw-bold text-dark border-1"
                        name="price"
                        placeholder="Price"
                        rows="3"
                      />
                      <label for="price">Price</label>
                    </div>
                  </fieldset>
                  <fieldset class="mt-4">
                    <div class="form-floating mb-3">
                      <input
                        id="vendor"
                        v-model="newProduct.vendor"
                        class="form-control form-control-lg fw-bold text-dark border-1"
                        name="vendor"
                        placeholder="Vendor"
                        rows="3"
                      />
                      <label for="vendor">Vendor</label>
                    </div>
                  </fieldset>
                </div>
                <div>
                  <div class="modal-footer border-top-0">
                    <button
                      ref="CloseAddProduct"
                      type="button"
                      class="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="createProduct()"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from './Navbar.vue'

interface Product {
  id?: number
  name: string
  price: number
  vendor: string
  averageStars?: number
  reviewsCount?: number
}

interface ComponentData {
  products: Product[]
  currentProduct: Product | null
  review: {
    stars: number
    comment: string
  }
  newProduct: Product
}

export default Vue.extend({
  name: 'ProductsPage',
  components: { Navbar },
  props: {
    maxStars: {
      type: Number,
      default: 5,
    },
  },
  data(): ComponentData {
    return {
      products: [],
      currentProduct: null,
      review: {
        stars: 0,
        comment: '',
      },
      newProduct: {
        name: '',
        price: 0,
        vendor: '',
      },
    }
  },
  mounted() {
    this.getProducts()
    this.$store.commit('user/logOnUser')
  },
  methods: {
    getProducts() {
      this.$axios.get('/products').then(({ data }) => {
        this.products = data.products
      })
    },
    setCurrentProduct(product: Product) {
      if (!this.$store.state.user.isLoggedIn) {
        this.$toast.error('You must be logged in to review products')
        this.$router.push('/signin')
        return
      }
      this.currentProduct = product
    },
    publishReview() {
      const { user } = this.$store.state.user
      if (!user) {
        return this.$router.push('/signin')
      }
      this.$axios
        .post(
          '/reviews',
          {
            productId: this.currentProduct?.id,
            stars: this.review.stars,
            comment: this.review.comment,
          },
          {
            headers: {
              authorization: user.token,
            },
          }
        )
        .then(() => {
          this.$toast.success('Review added')
          this.getProducts()
          const btn = this.$refs.CloseReview as HTMLButtonElement
          btn?.click()
        })
    },
    createProduct() {
      const { user } = this.$store.state.user

      if (!user) {
        return this.$router.push('/signin')
      }
      this.$axios
        .post(
          '/products',
          {
            name: this.newProduct.name,
            price: this.newProduct.price,
            vendor: this.newProduct.vendor,
          },
          {
            headers: {
              authorization: user.token,
            },
          }
        )
        .then(() => {
          this.$toast.success('Product added')
          this.getProducts()
          const btn = this.$refs.CloseAddProduct as HTMLButtonElement
          btn?.click()
        })
    },
  },
})
</script>

<style scope lang="scss">
$active-color: #f3d23e;

.star.active {
  color: $active-color;
}

.star:hover {
  color: $active-color;
}
</style>
