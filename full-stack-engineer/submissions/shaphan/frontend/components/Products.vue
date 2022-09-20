<template>
  <div>
    <div class="container">
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
                @click="setCurrentProduct(product)"
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--     Modal -->
    <Modal :show="showReviewModal" show-close @close="showReviewModal = false">
      <div class="mt-2 mr-4">
        <h1 class="main-heading mt-0">Review the product</h1>
        <div class="row mt-4">
          <div class="ratings">
            <fa-icon
              v-for="star in maxStars"
              :key="'_' + star"
              :class="{ active: star <= review.stars, 'text-danger': reviewErrors.stars && !review.stars }"
              :icon="[star <= review.stars ? 'fas' : 'far', 'star']"
              class="star fa-2x"
              @click="review.stars = star"
            ></fa-icon>
            <div v-if="reviewErrors.stars && ! review.stars" class="mt-2 text-danger">{{ reviewErrors.stars }}</div>
          </div>
        </div>
        <div>
          <div class="form">
            <fieldset class="mt-4">
              <div class="form-floating mb-3 has-validation">
                      <textarea
                        id="comment"
                        v-model="review.comment"
                        class="form-control form-control-lg fw-bold text-dark border-1"
                        name="comment"
                        placeholder="Add your review"
                        rows="3"
                        :class="{'is-invalid': reviewErrors.comment && !review.comment}"
                      />
                <div class="invalid-feedback">{{ reviewErrors.comment }}</div>
                <label for="comment">Write review</label>

              </div>

            </fieldset>
          </div>
          <div>
            <div class="modal-footer border-top-0">
              <button
                type="button"
                class="btn btn-light"
                @click="showReviewModal = false"
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
    </Modal>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import {IBackendError, IProduct} from "~/services/types";

interface ComponentData {
  products: IProduct[]
  currentProduct: IProduct | null
  review: {
    stars: number
    comment: string
  }
  newProduct: IProduct
  showProductModal: boolean
  showReviewModal: boolean,
  reviewErrors: {
    [x: string]: string
  }
}

export default Vue.extend({
  name: 'ProductsPage',
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
      reviewErrors: {
        comment: '',
        stars: ''
      },
      review: {
        stars: 0,
        comment: '',
      },
      newProduct: {
        name: '',
        price: 0,
        vendor: '',
      },
      showProductModal: false,
      showReviewModal: false,
    }
  },
  async fetch() {
    const res = await this.$productService.GetProducts()
    this.products = res.products
  },

  computed: {
    isLoggedIn () {
      return this.$store.getters["user/isLoggedIn"]
    },
    user() {
      return this.$store.getters["user/user"]
    }
  },

  methods: {
    setCurrentProduct(product: IProduct) {
      if (!this.isLoggedIn) {
        this.$toast.error('You must be logged in to review products')
        this.$router.push('/signin')
        return
      }
      this.currentProduct = product
      this.showReviewModal = true
    },
    publishReview() {
      if (!this.isLoggedIn) {
        return this.$router.push('/signin')
      }
      this.$productService.CreateReview({
        productId: this.currentProduct?.id || 0,
        stars: this.review.stars,
        comment: this.review.comment
      }, this.user.token).then((data) => {
          if (data.success) {
            this.$toast.success(data.message)
            this.$fetch()
            this.showReviewModal = false
            this.review.stars = 0
            this.review.comment = ""
          }

        }).catch(err => {
        if (err.response.data?.errors?.length) {
          this.$toast.error(err.response.data.message || "Error Occurred!")
          const errors: {[x:string]: string} = {}
          err.response.data.errors.forEach((error: IBackendError) => {
            errors[error.param] = error.msg
          })
          this.reviewErrors = errors
        } else {
          this.$toast.error(err.response.data.message || "Error Occurred!")
        }
      })
    },
  },
})
</script>

<style lang="scss">
$active-color: #f3d23e;

.star.active {
  color: $active-color;
}

.star:hover {
  color: $active-color;
}
</style>
