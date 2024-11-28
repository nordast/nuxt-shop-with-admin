<script setup lang="ts">
import { columns } from "~/components/Admin/Category/columns";

const { data: categories, status } = await useFetch("/api/admin/categories/", {
  key: "categories",
});

const breadcrumbs = [
  {
    text: "Categories",
  },
];
</script>

<template>
  <TheHeading
    title="Categories"
    description="Manage categories"
    :breadcrumbs="breadcrumbs"
  >
    <NuxtLink to="/admin/categories/create">
      <Button>
        <Icon name="lucide:plus" class="size-4" />
        Add New
      </Button>
    </NuxtLink>
  </TheHeading>

  <DataTable
    v-if="status !== 'pending'"
    :columns="columns"
    :data="categories"
    column-to-search="name"
    edit-link="/admin/categories/:id"
  ></DataTable>
</template>

<style scoped></style>
