<script setup lang="ts">
import type { SafeProduct } from "~/types";
import { formatPrice } from "~/utils";

defineProps<{
  data: SafeProduct;
}>();
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900">{{ data.name }}</h1>

    <div class="mt-3 flex items-end justify-between">
      <div class="text-2xl text-gray-900">
        <div class="flex items-center justify-between">
          <div class="font-semibold">{{ formatPrice(data.price) }}</div>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <div class="flex flex-col gap-y-6">
      <div class="flex items-center gap-x-4">
        <h3 class="font-semibold text-black">Gauge:</h3>
        <div>{{ data.size.name }}</div>
      </div>

      <div class="flex items-center gap-x-4">
        <h3 class="font-semibold text-black">Color:</h3>
        <div
          class="size-6 rounded-full border border-gray-600"
          :style="`background-color: ${data.color.value}`"
          :title="data.color.name"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
