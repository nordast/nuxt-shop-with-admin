<script setup lang="ts">
import type { RouteParams } from "~/types";
import type { Product } from "@prisma/client";
import { nl2br } from "~/utils";

const route = useRoute();
const routeId = (route.params as RouteParams).productId;
const currentProduct = await $fetch<Product>(`/api/admin/products/${routeId}`);

const { addItem } = useCart();
</script>

<template>
  <div class="w-full py-16 sm:py-32 px-4 sm:px-6 lg:px-8">
    <div
      v-if="currentProduct"
      class="w-full grid grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
    >
      <div class="sm:col-span-4 lg:col-span-5">
        <Carousel class="relative w-full">
          <CarouselContent>
            <CarouselItem
              v-for="image in currentProduct.images"
              :key="image.id"
            >
              <div
                class="flex aspect-square items-center justify-center border p-2 rounded"
              >
                <img :src="image.url" class="" :alt="currentProduct.name" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="previous-btn" />
          <CarouselNext class="next-btn" />
        </Carousel>
      </div>

      <div class="sm:col-span-8 lg:col-span-7">
        <ProductInfo :data="currentProduct"></ProductInfo>

        <div class="mt-10 flex items-center gap-x-3">
          <Button
            class="rounded-full"
            type="button"
            @click.stop.prevent="addItem(currentProduct)"
          >
            <Icon name="lucide:shopping-cart" class="size-4" />
            Add to Cart
          </Button>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">
          Product Details
        </h2>
        <div v-html="nl2br(currentProduct.details)"></div>

        <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">
          Features & Benefits
        </h2>
        <div v-html="nl2br(currentProduct.features)"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.previous-btn {
  left: calc(50% - 40px);
  top: calc(100% + 30px);
}
.next-btn {
  left: 50%;
  top: calc(100% + 30px);
}
</style>
