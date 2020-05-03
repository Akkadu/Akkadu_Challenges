<template>
  <div class="user-info">
    <i class="fas pr-5" :class="faIcon" />
    <span class="pr-10" :class="infoTextClass">{{infoText}}</span>
    <span class="pr-10" :class="infoSubtextClass">{{infoSubtext}}</span>
  </div>
</template>

<script>
export default {
  props: [
    "faIcon",
    "infoText",
    "infoTextClass",
    "infoSubtext",
    "infoSubtextClass"
  ]
};
</script>