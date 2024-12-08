<script setup>
const year = computed(() => new Date().getFullYear());
</script>

<template>
  <div class="root">
    <div class="text-center">© {{ year }} Wirenco All rights reserved</div>
  </div>
</template>

<style scoped>
.root {
  @apply bg-slate-100 border-t border-slate-200 p-8 text-center dark:bg-zinc-900 dark:border-zinc-800;
}
</style>
