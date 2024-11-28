<script setup lang="ts">
type BreadcrumbLink = {
  label: string;
  url: string;
};

type BreadcrumbPage = {
  currentPage: string;
  items: BreadcrumbLink[];
};

defineProps<BreadcrumbPage>();
</script>

<template>
  <Breadcrumb class="mt-4">
    <BreadcrumbList class="text-xs">
      <BreadcrumbItem>
        <BreadcrumbLink href="/admin"> Home </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components"> Components </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
