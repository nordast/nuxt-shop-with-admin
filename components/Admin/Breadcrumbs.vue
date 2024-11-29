<script setup lang="ts">
import type { Breadcrumb } from "~/types";

defineProps<{
  breadcrumbs?: Breadcrumb[] | undefined;
}>();
</script>

<template>
  <Breadcrumb v-if="!!breadcrumbs?.length" class="mt-4">
    <BreadcrumbList class="text-xs">
      <BreadcrumbItem>
        <BreadcrumbLink href="/admin"> Dashboard </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />

      <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb">
        <BreadcrumbItem>
          <template v-if="!!breadcrumb.href">
            <BreadcrumbLink :href="breadcrumb.href">
              {{ breadcrumb.text }}
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </template>

          <BreadcrumbPage v-else>{{ breadcrumb.text }}</BreadcrumbPage>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
