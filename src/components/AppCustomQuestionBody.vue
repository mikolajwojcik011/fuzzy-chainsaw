<script lang="ts">
export default {
  name: "AppCustomQuestionBody",
  components: {},
};
</script>

<template>
  <div class="flex flex-col w-7/12 self-center">
    <slot name="slotHeader"></slot>
  </div>
  <div class="w-full flex flex-col mt-20">
    <slot name="slotBody"></slot>
  </div>
</template>
