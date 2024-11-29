<script setup lang="ts">
defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}>();
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Input
          :type="type || 'text'"
          :placeholder="placeholder"
          v-bind="componentField"
        />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<style scoped></style>
