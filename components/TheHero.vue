<script setup lang="ts"></script>

<template>
  <section class="root">
    <h1 class="text-7xl font-mono font-black">New Collection</h1>
    <div class="flex items-center justify-center space-x-4 lg:space-x-6">
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
    </div>
  </section>
</template>

<style scoped>
.root {
  @apply text-white bg-slate-100 bg-[url('/images/hero.png')] bg-no-repeat bg-cover bg-center border-b border-slate-200 py-48 text-center space-y-24;
}

.nav-category {
  @apply font-semibold border-2 border-white text-xl px-12 py-2 hover:bg-white hover:text-primary transition-colors;
}
</style>
