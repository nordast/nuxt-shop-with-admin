<script setup lang="ts">
const { cartItems } = useCart();
</script>

<template>
  <div class="px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-black dark:text-slate-100">
      Shopping Cart
    </h1>
    <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
      <div class="lg:col-span-7">
        <!-- Cart Items-->
        <ul>
          <CartItem
            v-for="item in cartItems.items"
            :key="item.id"
            :data="item"
          />
          <li
            v-if="!cartItems.items.length"
            class="text-neutral-500 dark:text-slate-100"
          >
            Your cart is empty.
          </li>
        </ul>
      </div>

      <!-- Cart Summary -->
      <CartSummary />
    </div>
  </div>
</template>

<style scoped></style>
