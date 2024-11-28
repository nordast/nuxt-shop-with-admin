<script setup lang="ts">
import { columns } from "~/components/Admin/Category/columns";

const { data: categories, status } = await useFetch("/api/admin/categories/", {
  key: "categories",
});
</script>

<template>
  <TheHeading title="Categories" description="Manage categories">
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
  ></DataTable>
</template>

<style scoped></style>
