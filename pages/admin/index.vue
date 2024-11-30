<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">Admin</div>

    <div class="flex flex-col space-y-2 p-10">
      <NuxtLink to="/admin/categories">Categories</NuxtLink>
      <NuxtLink to="/admin/colors">Colors</NuxtLink>
      <NuxtLink to="/admin/sizes">Sizes</NuxtLink>
      <NuxtLink to="/admin/products">Products</NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
