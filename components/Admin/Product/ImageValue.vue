<script setup lang="ts">
import { addCloudinaryParams } from "~/utils";

defineProps<{
  imageUrl: string;
}>();
</script>

<template>
  <img
    :src="addCloudinaryParams(imageUrl)"
    alt=""
    class="w-auto h-28 object-cover"
  />
</template>

<style scoped></style>
