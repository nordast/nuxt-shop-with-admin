<script setup lang="ts">
const { isOpen, onClose, selectedProduct } = usePreviewModal();
</script>

<template>
  <AppModal :is-modal-visible="isOpen" @on-close="onClose">
    <div
      v-if="selectedProduct"
      class="w-full grid grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
    >
      {{ selectedProduct?.name }}
    </div>
  </AppModal>
</template>

<style scoped></style>
