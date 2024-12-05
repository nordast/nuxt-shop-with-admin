<script setup lang="ts">
const { cartItems, removeAllItems } = useCart();
const route = useRoute();
const { showMessage } = useStore();

const itemsCount = computed(() => cartItems.value.items.length);

const totalPrice = computed(() => {
  return cartItems.value.items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
});

const onCheckout = async () => {
  const items = cartItems.value.items.map((item) => item.id);

  const data = await $fetch("/api/checkout", {
    method: "POST",
    body: items,
  });

  if (data?.url) {
    window.location.href = data.url;
  }

  removeAllItems();

  return;
};

onMounted(() => {
  if (route.query.success) {
    showMessage({
      title: "Payment successful",
    });
  }
  if (route.query.cancelled) {
    showMessage({
      title: "Payment cancelled",
      variant: "destructive",
    });
  }
});
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
      :disabled="itemsCount === 0"
      class="w-full mt-6"
      type="button"
      @click="onCheckout"
    >
      Checkout {{ !itemsCount }}
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
