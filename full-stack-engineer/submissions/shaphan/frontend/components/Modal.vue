<template>
  <div ref="modal" class="modal fade" tabindex="-1" role="dialog" :aria-hidden="!show">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      :class="[{ [`modal-${size}`]: size }]"
    >
      <div class="modal-content">
        <div v-if="$slots.header" class="modal-header">
          <h5 class="modal-title">
            <slot name="header" />
          </h5>
          <button
            v-if="showClose"
            type="button"
            class="btn-close btn-close"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          />
        </div>
        <div class="modal-body" :class="{ 'shadow-inset': scrollbarVisible }">
          <slot />
        </div>
        <div v-if="$slots.footer" class="modal-footer d-flex justify-content-end align-items-center">
          <button v-if="showClose" class="btn btn-light" @click.prevent="closeModal">Cancel</button>
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

const bootstrap = typeof window !== `undefined` && import('bootstrap')

let uid = 0
export default {
  name: 'ModalComponent',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  emits: ['close'],
  data() {
    uid += 1
    return {
      modal: null,
      uid:'modal-' + uid,
      scrollbarVisible: false,
    }
  },
  watch: {
    show(value) {
      if (!this.modal) return

      if (value) {
        this.modal.show()
      } else {
        this.modal.hide()
      }
    },
  },
  mounted() {
    bootstrap?.then(({ Modal }) => {
      this.modal = new Modal(this.$refs.modal, {
        backdrop: false,
      })

      if (this.show) {
        this.modal.show()
      }
    })
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>
