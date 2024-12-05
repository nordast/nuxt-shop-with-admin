<script setup lang="ts">
const { user } = useUserSession();
const { cartItems } = useCart();
</script>

<template>
  <header class="border z-10">
    <div
      class="bg-[#ff0000] text-white border-b border-slate-200 p-1 text-center"
    >
      <span class="capitalize italic text-xl font-black">
        Holiday Starts Now
      </span>
      <span class="font-semibold">
        &nbsp; 25% Off<sup>†</sup>
        &nbsp;With Code
        <strong class="underline">CHEER</strong>
      </span>
      &nbsp;&nbsp;
      <span class="text-sm">
        <sup>†</sup>
        Some exclusions apply.
      </span>
    </div>

    <div class="flex py-10 px-10 items-center justify-between">
      <NuxtLink to="/" class="">
        <img src="/logo.svg" alt="Logo" class="cursor-pointer w-40" />
      </NuxtLink>

      <nav class="flex items-center space-x-4 lg:space-x-6">
        <NuxtLink
          to="/products?categoryId=675198b6e1404c5fd9d1cd8b"
          class="nav-category"
        >
          Men
        </NuxtLink>
        <NuxtLink
          to="/products?categoryId=675198afe1404c5fd9d1cd8a"
          class="nav-category"
        >
          Women
        </NuxtLink>
        <NuxtLink
          to="/products?categoryId=67519780e1404c5fd9d1cd84"
          class="nav-category"
        >
          Kids
        </NuxtLink>

        <template v-if="user">
          <NavbarAdminMenu v-if="user.role === 'ADMIN'" />
          <NavbarUserMenu />
        </template>

        <NavbarDarkMode />

        <NuxtLink to="/cart">
          <Button class="relative rounded-full px-5 py-1 h-8">
            <Icon name="lucide:shopping-bag" class="size-4 mr-2" />
            {{ cartItems && cartItems.items.length }}
          </Button>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-category {
  @apply font-semibold hover:text-neutral-500 transition-colors uppercase;
}
</style>
