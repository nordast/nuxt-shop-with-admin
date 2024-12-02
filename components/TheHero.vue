<script setup lang="ts"></script>

<template>
  <section class="root">
    <h2>Hero</h2>

    <NuxtLink to="/products">
      <Button>Shop Collection</Button>
    </NuxtLink>
  </section>
</template>

<style scoped>
.root {
  @apply bg-rose-100 h-60 flex flex-col items-center justify-center gap-8;
}
</style>
