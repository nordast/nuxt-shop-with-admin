<script setup>
const year = computed(() => new Date().getFullYear());
</script>

<template>
  <div class="bg-slate-100 border-t border-slate-200 p-8 text-center">
    <div class="text-center">© {{ year }} Wirenco All rights reserved</div>
  </div>
</template>
