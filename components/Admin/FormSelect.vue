<script setup lang="ts">
type BaseOption = {
  id: string;
  name: string;
};

defineProps<{
  name: string;
  label: string;
  options: Array<BaseOption & Record<string, string | number | Date>>;
}>();
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger>
            <SelectValue :placeholder="`Select a ${label.toLowerCase()}`" />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="item in options" :key="item.id" :value="item.id">
              {{ item.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<style scoped></style>
