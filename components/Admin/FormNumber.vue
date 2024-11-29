<script setup lang="ts">
defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  setFieldValue: (name: any, value: unknown) => void;
}>();
</script>

<template>
  <FormField v-slot="{ value }" :name="name">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <NumberField
        class="gap-2"
        :min="1"
        :format-options="{
          style: 'currency',
          currency: 'USD',
          currencyDisplay: 'code',
          currencySign: 'accounting',
        }"
        :model-value="value"
        @update:model-value="
          (v) => {
            if (v) {
              setFieldValue(name, v);
            } else {
              setFieldValue(name, undefined);
            }
          }
        "
      >
        <NumberFieldContent>
          <NumberFieldDecrement />
          <FormControl>
            <NumberFieldInput />
          </FormControl>
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<style scoped></style>
