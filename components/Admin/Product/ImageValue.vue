<script setup lang="ts">
defineProps<{
  imageUrl: string;
}>();
</script>

<template>
  <img :src="imageUrl" alt="" class="w-auto h-28 object-cover" />
</template>

<style scoped></style>
