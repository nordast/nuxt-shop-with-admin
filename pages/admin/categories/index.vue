<script setup lang="ts">
import { columns } from "~/components/Admin/Category/columns";
import type { Category } from "@prisma/client";
import { formatDateTime } from "~/utils";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

const breadcrumbs = [{ text: "Categories" }];

const { data: categories, status } = await useFetch("/api/admin/categories/", {
  key: "categories",
  transform: (data) =>
    data.map((item: Category) => ({
      ...item,
      createdAt: formatDateTime(item.createdAt),
    })),
});
</script>

<template>
  <div>
    <AdminHeading
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
    </AdminHeading>

    <AdminDataTable
      v-if="status !== 'pending'"
      :columns="columns"
      :data="categories"
      column-to-search="name"
      edit-link="/admin/categories/:id"
    />
  </div>
</template>

<style scoped></style>
