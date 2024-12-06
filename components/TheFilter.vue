<script setup lang="ts">
import type { Category, Color, Size } from "@prisma/client";

defineProps<{
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}>();
</script>

<template>
  <FilterItem value-key="categoryId" name="Categories" :data="categories" />
  <FilterItem value-key="sizeId" name="Gauge" :data="sizes" />
  <FilterItem value-key="colorId" name="Colors" :data="colors" />
</template>

<style scoped></style>
