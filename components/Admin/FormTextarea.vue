<script setup lang="ts">
defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}>();
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Textarea
          :placeholder="placeholder || `Enter a ${label}`"
          class="resize-none"
          v-bind="componentField"
        />
      </FormControl>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<style scoped></style>
