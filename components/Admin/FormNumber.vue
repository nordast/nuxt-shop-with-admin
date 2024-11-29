<script setup lang="ts">
defineProps<{
  name: string;
  label: string;
  placeholder?: string;
}>();
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Input
          type="number"
          min="0"
          :placeholder="placeholder || `Enter a ${label}`"
          v-bind="componentField"
        />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<style scoped></style>
