<script setup lang="ts">
defineProps<{
  colorCode: string;
}>();
</script>

<template>
  <div class="flex items-center gap-x-2">
    {{ colorCode }}
    <div
      class="size-6 rounded-full border"
      :style="`background-color: ${colorCode}`"
    ></div>
  </div>
</template>

<style scoped></style>
