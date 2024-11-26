<script setup lang="ts">
defineProps<{
  label: string;
  icon: string;
}>();

const authenticate = () => {
  window.location.href = "/api/auth/github";
};
</script>

<template>
  <Button variant="outline" class="w-full" type="button" @click="authenticate">
    <div class="flex items-center">
      <Icon :name="icon" class="mr-2 size-6" />
      {{ label }}
    </div>
  </Button>
</template>

<style scoped></style>
