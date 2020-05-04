<template>
  <div>
    <i :class="infoIcon" />
    <span :class="infoTextClass">{{infoText}}</span>
    <span :class="[infoSubtextClass, {'is-block pl-35' : !isSubtextInline}]">{{subtextString}}</span>
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
      //compute subtext string with or without hyphen '-'
      return this.isSubtextInline ? ` - ${this.infoSubtext}` : this.infoSubtext;
    }
  }
};
</script>