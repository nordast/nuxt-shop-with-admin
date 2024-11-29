<script setup lang="ts">
defineProps<{
  name: string;
  label: string;
  description?: string;
}>();
</script>

<template>
  <FormField v-slot="{ value, handleChange }" :name="name">
    <FormItem
      class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
    >
      <FormControl>
        <Checkbox :checked="value" @update:checked="handleChange" />
      </FormControl>
      <div class="space-y-1 leading-none">
        <FormLabel>{{ label }}</FormLabel>
        <FormDescription v-if="description">
          {{ description }}
        </FormDescription>
        <FormMessage />
      </div>
    </FormItem>
  </FormField>
</template>

<style scoped></style>
