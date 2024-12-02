<script setup lang="ts"></script>

<template>
  <div class="root">
    <div class="flex items-center justify-center text-natural-500">
      No results found.
    </div>
    <NuxtLink to="/products">
      <Button variant="outline"> Clear Filters </Button>
    </NuxtLink>
  </div>
</template>

<style scoped>
.root {
  @apply flex flex-col items-center justify-center h-full w-full space-y-3;
}
</style>
