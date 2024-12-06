<script setup lang="ts"></script>

<template>
  <section class="root">
    <h1 class="text-7xl font-mono font-black">Building Wire</h1>

    <div class="text-2xl font-bold">
      Non-Metallic Copper Wire for use in Indoor Applications.
    </div>

    <div>
      <NuxtLink to="/products">
        <Button
          class="bg-primary rounded-md text-lg px-8 py-6 cursor-pointer hover:bg-sky-400 transition"
          type="button"
          >Shop now</Button
        >
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.root {
  @apply text-white bg-slate-100 bg-[url('/images/hero.webp')] bg-no-repeat bg-cover bg-center border-b border-slate-200 py-24 text-center space-y-12;
}

.nav-category {
  @apply font-semibold border-2 border-white text-xl px-12 py-2 hover:bg-white hover:text-primary transition-colors;
}
</style>
