<script setup lang="ts">
import { columns } from "~/components/Admin/Color/columns";
import type { Color } from "@prisma/client";
import { formatDateTime } from "~/lib/utils";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

const breadcrumbs = [{ text: "Colors" }];

const { data: colors, status } = await useFetch("/api/admin/colors/", {
  key: "colors",
  transform: (data) =>
    data.map((item: Color) => ({
      ...item,
      createdAt: formatDateTime(item.createdAt),
    })),
});
</script>

<template>
  <div>
    <AdminHeading
      title="Colors"
      description="Manage colors"
      :breadcrumbs="breadcrumbs"
    >
      <NuxtLink to="/admin/colors/create">
        <Button>
          <Icon name="lucide:plus" class="size-4" />
          Add New
        </Button>
      </NuxtLink>
    </AdminHeading>

    <AdminDataTable
      v-if="status !== 'pending'"
      :columns="columns"
      :data="colors"
      column-to-search="name"
      edit-link="/admin/colors/:id"
    />
  </div>
</template>

<style scoped></style>
