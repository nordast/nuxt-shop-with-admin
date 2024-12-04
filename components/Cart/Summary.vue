<script setup lang="ts">
const { cartItems, removeAllItems } = useCart();

const totalPrice = computed(() => {
  return cartItems.value.items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
});

const onCheckout = async () => {
  // API Call
  const items = cartItems.value.items.map((item) => item.id);
  console.log(items);
  removeAllItems();
};
</script>

<template>
  <div class="root">
    <h2 class="text-lg font-medium text-gray-900">Order summary for this</h2>

    <div class="mt-6 space-y-4">
      <div class="summary">
        <div class="text-base font-medium text-gray-900">Order Total</div>
        <div class="font-semibold">{{ formatPrice(totalPrice) }}</div>
      </div>
    </div>

    <Button
      :disabled="!cartItems.items.length"
      class="w-full mt-6"
      type="button"
      @click="onCheckout"
    >
      Checkout
    </Button>
  </div>
</template>

<style scoped>
.root {
  @apply mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8;
}
.summary {
  @apply flex items-center justify-between border-t border-gray-200 pt-4;
}
</style>
