<template>
  <div>
    <Navbar />
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
              v-if="Number(rev?.User?.id || 0) == Number(user?.id)"
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
                      <label for="comment">Edit review</label>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from './Navbar.vue'

interface Review {
  id: number
  stars: number
  comment: string
  User?: {
    id: number
    fullName: string
  }
}

interface Product {
  id: number
  name: string
  price: number
  vendor: string
  averageStars: number
  reviewsCount: number
  reviews: Review[]
}

interface ComponentData {
  product: Product | null
  review: {
    stars: number
    comment: string
    id: number
  }
  user: {
    id: number
    fullName: string
    token: string
  } | null

  currentReview: Review | null
  isLoggedIn: boolean
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
      product: null,
      review: {
        id: 0,
        stars: 0,
        comment: '',
      },
      user: null,
      currentReview: null,
      isLoggedIn: false,
    }
  },
  mounted() {
    const productId = this.$route.params.id
    this.$store.commit('user/logOnUser')
    const { user } = this.$store.state.user
    this.isLoggedIn = this.$store.state.isLoggedIn
    this.user = user
    this.getProductReviews(Number(productId))
  },
  methods: {
    getProductReviews(id: number) {
      this.$axios.get(`/products/${id}/reviews`).then(({ data }) => {
        this.product = data.product
      })
    },
    publishReview() {
      const { user } = this.$store.state.user

      if (!user) {
        return this.$router.push('/signin')
      }
      this.$axios
        .put(
          `/reviews/${this.review.id}`,
          {
            productId: this.product?.id,
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
          this.$toast.success('Review updated')
          this.getProductReviews(this.product?.id || 0)
          const btn = this.$refs.CloseReview as HTMLButtonElement
          btn?.click()
        })
    },
    deleteReview(id: number) {
      this.$axios.delete(`/reviews/${id}`).then(() => {
        this.$toast.success('Review deleted')
        this.getProductReviews(this.product?.id || 0)
      })
    },

    setCurrentReview(review: Review) {
      this.review = review
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
