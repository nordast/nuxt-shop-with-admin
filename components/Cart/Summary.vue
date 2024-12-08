<script setup lang="ts">
const { cartItems, removeAllItems } = useCart();
const route = useRoute();
const { showMessage } = useStore();

const itemsCount = computed(() => cartItems.value.items.length);
const isLoading = ref(false);

const subTotalPrice = computed(() => {
  const price = cartItems.value.items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  return price * 50;
});

const tax = computed(() => subTotalPrice.value * 0.15);
const processing = 19.99;
const totalPrice = computed(() => subTotalPrice.value + tax.value + processing);

const onCheckout = async () => {
  isLoading.value = true;
  const items = cartItems.value.items.map((item) => item.id);

  const data = await $fetch("/api/checkout", {
    method: "POST",
    body: items,
  });

  if (data?.url) {
    window.location.href = data.url;
  }

  removeAllItems();
  isLoading.value = false;
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
    <h2
      class="text-center text-lg font-medium text-gray-900 dark:text-slate-100"
    >
      Your Order
    </h2>

    <div class="mt-6 space-y-4">
      <div class="summary">
        <div class="text-base font-medium text-gray-900 dark:text-slate-100">
          Subtotal
        </div>
        <div class="font-semibold">{{ formatPrice(subTotalPrice) }}</div>
      </div>
      <div class="summary">
        <div class="text-base font-medium text-gray-900 dark:text-slate-100">
          Order Processing Fee
        </div>
        <div class="font-semibold">{{ formatPrice(processing) }}</div>
      </div>
      <div class="summary">
        <div class="text-base font-medium text-gray-900 dark:text-slate-100">
          Tax
        </div>
        <div class="font-semibold">{{ formatPrice(tax) }}</div>
      </div>
      <div class="summary text-lg">
        <div class="text-base font-medium text-gray-900 dark:text-slate-100">
          Order Total
        </div>
        <div class="font-semibold">{{ formatPrice(totalPrice) }}</div>
      </div>
    </div>

    <Button
      :disabled="itemsCount === 0 || isLoading"
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
  @apply mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50;
}
.summary {
  @apply flex items-center justify-between border-t border-gray-200 pt-4;
}
</style>
