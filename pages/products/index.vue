<script setup lang="ts">
import type { RouteParams, SafeProduct } from "~/types";
import TheFilter from "../../components/TheFilter.vue";

const route = useRoute();

const categoryId = computed(() => (route.query as RouteParams).categoryId);
const colorId = computed(() => (route.query as RouteParams).colorId);
const sizeId = computed(() => (route.query as RouteParams).sizeId);

const { data: products, status } = await useFetch<SafeProduct[]>(
  "/api/admin/products/",
  {
    lazy: true,
    query: {
      categoryId,
      colorId,
      sizeId,
    },
  },
);

const { data: cachedCategories } = useNuxtData("categories");
const { data: cachedSizes } = useNuxtData("sizes");
const { data: cachedColors } = useNuxtData("colors");

const { data: categories } = await useFetch("/api/admin/categories/", {
  key: "categories",
  default: cachedCategories.value,
});

const { data: sizes } = await useFetch("/api/admin/sizes/", {
  key: "sizes",
  default: cachedSizes.value,
});

const { data: colors } = await useFetch("/api/admin/colors/", {
  key: "colors",
  default: cachedColors.value,
});
</script>

<template>
  <div class="mx-auto max-w-6xl my-4 w-fill">
    <div class="px-4 pb-24">
      <div class="lg:grid lg:grid-cols-5 lg:gap-x-8">
        <MobileFilter
          :categories="categories"
          :sizes="sizes"
          :colors="colors"
        />
        <div class="hidden lg:block">
          <TheFilter :categories="categories" :sizes="sizes" :colors="colors" />
        </div>

        <div class="mt-6 lg:col-span-4 lg:mt-0">
          <NoResults v-if="status !== 'pending' && !products?.length" />

          <div
            v-auto-animate
            class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            <template v-if="status !== 'pending' && products?.length">
              <ProductCard
                v-for="item in products"
                :key="item.id"
                :data="item"
              />
            </template>

            <template v-if="status === 'pending'">
              <CardLoader v-for="i in 6" :key="i" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
