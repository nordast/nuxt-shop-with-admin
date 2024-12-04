<script setup lang="ts">
import type { SafeProduct } from "~/types";

const { data: products, status } = await useFetch<SafeProduct[] | null>(
  `/api/admin/products?isFeatured=true&limit=6&sort=createdAt:desc`,
  {
    lazy: true,
  },
);
</script>

<template>
  <section class="mx-auto w-full max-w-5xl py-16 sm:py-32">
    <div class="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <ProductList
        v-if="products"
        :items="products"
        :is-loading="status === 'pending'"
        title="Featured Products"
      />
    </div>
  </section>
</template>

<style scoped></style>
