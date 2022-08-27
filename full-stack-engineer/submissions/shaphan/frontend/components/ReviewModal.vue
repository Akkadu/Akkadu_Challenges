<template>
<!-- Modal -->
<div id="addReviewModal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="Add review" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">

                        <div class="mt-2 mr-4">
                    <h1 class="main-heading mt-0">Review the product</h1>
                    <div class="row mt-4">
                        <div class="ratings">
                          <fa-icon
                            v-for="star in maxStars"
                            :key="'_'+star"
                            :class="{ 'active': star <= review.stars }"
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
                          <button ref="CloseReview" type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" class="btn btn-primary" @click="publishReview()">Publish</button>
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
export default Vue.extend({
    name: "ReviewModal",
    props: {
        maxStars: {
            type: Number,
            default: 5
        },
        publish: {
            type: Function,
            required: true
        },
        stars: {
            type: Number,
            default: 0
        },
        comment: {
            type: String,
            default: ""
        }
    },

    data() {
        return {
            review: {
                stars: 0,
                comment: ""
            }
        }
    },
    methods: {
        publishReview() {
            this.publish(this.review).then(() => {
                const btn = this.$refs.CloseReview as HTMLButtonElement
                btn?.click()
            });
        }
    },
  })
</script>
