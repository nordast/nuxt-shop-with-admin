<script setup lang="ts">
import type { SafeProduct } from "~/types";

const { data: products, status } = await useFetch<SafeProduct[]>(
  "/api/admin/products/",
  {
    lazy: true,
  },
);

const { data: cachedCategories } = useNuxtData("categories");
const { data: cachedSizes } = useNuxtData("sizes");
const { data: cachedColors } = useNuxtData("colors");

const { data: categories, status: categoriesStatus } = await useFetch(
  "/api/admin/categories/",
  {
    key: "categories",
    default: cachedCategories.value,
  },
);

const { data: sizes, status: sizesStatus } = await useFetch(
  "/api/admin/sizes/",
  {
    key: "sizes",
    default: cachedSizes.value,
  },
);

const { data: colors, status: colorsStatus } = await useFetch(
  "/api/admin/colors/",
  {
    key: "colors",
    default: cachedColors.value,
  },
);
</script>

<template>
  <div class="mx-auto max-w-6xl my-4 w-fill">
    <div class="px-4 pb-24">
      <div class="lg:grid lg:grid-cols-5 lg:gap-x-8">
        <!-- Mobile filter -->
        <div class="hidden lg:block">
          <TheFilter
            value-key="categoryId"
            name="Categories"
            :data="categories"
          />
          <TheFilter value-key="sizeId" name="Sizes" :data="sizes" />
          <TheFilter value-key="colorId" name="Colors" :data="colors" />
        </div>

        <div class="mt-6 lg:col-span-4 lg:mt-0">
          <NoResults
            v-if="status !== 'pending' && (!products || !products.length)"
          />

          <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <template
              v-if="status !== 'pending' && products && products.length"
            >
              <ProductCard
                v-for="item in products"
                :key="item.id"
                :data="item"
              />
            </template>

            <template v-else>
              <CardLoader v-for="i in 6" :key="i" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
