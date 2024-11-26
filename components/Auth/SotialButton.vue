<template>
  <Button variant="outline" class="w-full">
    <div class="flex items-center">
      <Icon :name="icon" class="mr-2 size-6" />
      {{ label }}
    </div>
  </Button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  icon: string;
}>();
</script>

<style scoped></style>
