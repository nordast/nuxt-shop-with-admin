<script setup lang="ts">
import type { SafeProduct } from "~/types";

const { data: products, status } = await useFetch<SafeProduct[]>(
  `/api/admin/products?isFeatured=true&limit=6&sort=createdAt:desc`,
  {
    lazy: true,
  },
);
</script>

<template>
  <section class="w-full py-16 sm:py-32">
    <div class="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <div class="space-y-4">
        <h3 class="font-bold text-3xl">Featured Products</h3>

        <NoResults v-if="!products?.length && status !== 'pending'" />

        <div class="grid grid-cols-4 gap-8">
          <template v-if="status !== 'pending'">
            <ProductCard v-for="item in products" :key="item.id" :data="item" />
          </template>

          <template v-else>
            <CardLoader v-for="i in 8" :key="i" />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
