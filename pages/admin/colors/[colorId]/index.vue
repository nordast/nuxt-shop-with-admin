<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <AdminColorForm />
    </div>
  </div>
</template>

<style scoped></style>
