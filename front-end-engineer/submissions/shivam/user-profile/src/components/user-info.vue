<template>
  <div>
    <i class="pr-5" :class="infoIcon" />
    <span class="pr-10" :class="infoTextClass">{{infoText}}</span>
    <span
      class="pr-10"
      :class="[infoSubtextClass, {'is-block' : !isSubtextInline}]"
    >{{subtextString}}</span>
  </div>
</template>

<script>
export default {
  props: [
    "infoIcon",
    "infoText",
    "infoTextClass",
    "infoSubtext",
    "infoSubtextClass",
    "isSubtextInline"
  ],
  computed: {
    subtextString() {
      return this.isSubtextInline ? ` - ${this.infoSubtext}` : this.infoSubtext;
    }
  }
};
</script>