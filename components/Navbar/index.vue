<script setup lang="ts">
const { user } = useUserSession();
const { cartItems } = useCart();

const itemsCount = ref(cartItems.value.items.length);

watchDeep(
  () => cartItems.value.items,
  (newItems) => (itemsCount.value = newItems.length),
);
</script>

<template>
  <header class="border z-10">
    <div class="header-top">FREE SHIPPING ON ALL ORDERS $19.99 OR MORE!!!</div>

    <div class="flex py-10 px-10 items-center justify-between">
      <NuxtLink to="/" class="">
        <img src="/logo.png" alt="Logo" class="cursor-pointer w-40" />
      </NuxtLink>

      <nav class="flex items-center space-x-4 lg:space-x-6">
        <template v-if="user">
          <NavbarAdminMenu v-if="user.role === 'ADMIN'" />
          <NavbarUserMenu />
        </template>

        <NavbarDarkMode />

        <NuxtLink to="/cart">
          <Button class="relative rounded-full px-5 py-1 h-8">
            <Icon name="lucide:shopping-bag" class="size-4 mr-2" />
            {{ itemsCount }}
          </Button>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-top {
  @apply bg-primary text-white border-b border-slate-200 p-1 text-center dark:text-slate-100 dark:bg-blue-900 dark:border-zinc-800;
}
</style>
