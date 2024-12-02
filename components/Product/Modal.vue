<script setup lang="ts">
const { isOpen, onClose, selectedProduct } = usePreviewModal();
</script>

<template>
  <AppModal :is-modal-visible="isOpen" @on-close="onClose">
    <div
      v-if="selectedProduct"
      class="w-full grid grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
    >
      <div class="sm:col-span-4 lg:col-span-5">
        <Carousel class="relative w-full">
          <CarouselContent>
            <CarouselItem
              v-for="image in selectedProduct.images"
              :key="image.id"
            >
              <div
                class="flex aspect-square items-center justify-center border p-2 rounded"
              >
                <img
                  :src="image.url"
                  class="size-40 object-cover object-center"
                  :alt="selectedProduct.name"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="previous-btn" />
          <CarouselNext class="next-btn" />
        </Carousel>
      </div>

      <div class="sm:col-span-8 lg:col-span-7">
        <ProductInfo :data="selectedProduct"></ProductInfo>
      </div>
    </div>
  </AppModal>
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
