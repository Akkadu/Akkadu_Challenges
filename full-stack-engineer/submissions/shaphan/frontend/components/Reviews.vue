<template>
  <div>
    <div class="container">
      <div class="card p-3 mt-4">
        <div class="d-flex justify-content-between align-items-center">
          <div class="mt-2">
            <h4 class="text-uppercase">{{ product?.vendor }}</h4>
            <div class="mt-2">
              <h1 class="main-heading mt-0">{{ product?.name }}</h1>
              <div class="d-flex align-items-center justify-content-between">
                <div class="ratings">
                  <fa-icon
                    v-for="i in product?.averageStars"
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
                <nuxt-link to="reviews"
                  >{{ product?.reviewsCount }} Reviews</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>

        <p class="fs-5 fw-bolder">USD {{ product?.price }}</p>
      </div>

      <div class="mt-2">
        <div class="list-group">
          <div
            v-for="rev in product?.reviews"
            :key="rev.id"
            class="list-group-item list-group-item-action"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ rev.User?.fullName }}</h5>
            </div>
            <div class="ratings">
              <fa-icon
                v-for="i in rev?.stars"
                :key="i"
                icon="star"
                regular
                class="text-warning"
              ></fa-icon>
              <fa-icon
                v-for="i in 5 - (rev?.stars || 0)"
                :key="'_' + i"
                :icon="['far', 'star']"
                regular
                class="text-primary"
              ></fa-icon>
            </div>
            <p class="mb-1">{{ rev.comment }}</p>
            <div
              v-if="Number(rev?.User?.id || 0) === Number(user?.id)"
              class="d-flex"
            >
              <button
                class="btn btn-link border-0"
                @click="deleteReview(rev.id)"
              >
                <fa-icon icon="trash" class="text-danger"> </fa-icon>
              </button>
              <button
                class="btn btn-link border-0"
                data-bs-toggle="modal"
                data-bs-target="#addReviewModal"
                @click="setCurrentReview(rev)"
              >
                <fa-icon icon="pen"> </fa-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Modal :show="showReviewModal" show-close @close="showReviewModal = false">
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
                      <label for="comment">Edit review</label>
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
import {IReview} from "~/types/review.types";
import {IBackendError, IProduct} from "~/services/types";

interface ComponentData {
  product: IProduct | null
  review: {
    stars: number
    comment: string
    id: number
  }
  currentReview: IReview | null
  showReviewModal: boolean
  reviewErrors: {
    [x: string]: string
  }
}

export default Vue.extend({
  name: 'ReviewsPage',
  props: {
    maxStars: {
      type: Number,
      default: 5,
    },
  },
  data(): ComponentData {
    return {
      product: null,
      reviewErrors: {
        comment: '',
        stars: ''
      },
      review: {
        id: 0,
        stars: 0,
        comment: '',
      },
      currentReview: null,
      showReviewModal: false
    }
  },
  async fetch() {
    const productId = this.$route.params.id
    const res = await this.$productService.GetProductReviews(Number(productId))
    this.product = res.product
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
    publishReview(): void {

      if (!this.isLoggedIn) {
        this.$router.push('/signin')
        return
      }
      this.$productService.EditReview({
          reviewId: this.review.id,
          stars: this.review.stars,
          productId: this.product?.id || 0,
          comment: this.review.comment
        }, this.user.token)
        .then((data) => {
          this.$toast.success(data.message)
          this.$fetch()
          this.showReviewModal = false
          this.review.comment = ""
          this.review.stars = 0
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
    deleteReview(id: number) {
      this.$productService.DeleteReview(id, this.user.token).then(() => {
        this.$toast.success('Review deleted')
        this.$fetch()
      }).catch(err => {
        this.$toast.error(err.response.data.message || "Error Occurred!")
      })
    },

    setCurrentReview(review: IReview) {
      this.review = review
      this.showReviewModal = true
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
