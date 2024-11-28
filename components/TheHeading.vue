<script setup lang="ts">
import type { Breadcrumb } from "~/types";

interface HeadingProps {
  title: string;
  description: string;
  breadcrumbs?: Breadcrumb[] | undefined;
}
defineProps<HeadingProps>();
</script>

<template>
  <div class="flex items-center justify-between w-full">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ title }}</h2>
      <p class="text-sm text-muted-foreground">{{ description }}</p>
    </div>
    <slot />
  </div>

  <AppBreadcrumb :breadcrumbs="breadcrumbs" />

  <Separator class="mt-2 mb-4" />
</template>

<style scoped></style>
