<script setup lang="ts">
import type { Category, Color, Size } from "@prisma/client";

defineProps<{
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}>();
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button class="rounded-full lg:hidden">
        <Icon name="lucide:plus" class="size-4 mr-2" />
        Filters
      </Button>
    </SheetTrigger>

    <SheetContent>
      <SheetHeader class="mb-6">
        <SheetTitle>Filters</SheetTitle>
      </SheetHeader>

      <FilterItem value-key="categoryId" name="Categories" :data="categories" />
      <FilterItem value-key="sizeId" name="Sizes" :data="sizes" />
      <FilterItem value-key="colorId" name="Colors" :data="colors" />
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
