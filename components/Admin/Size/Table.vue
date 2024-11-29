<script setup lang="ts">
import { columns } from "~/components/Admin/Size/columns";
import type { Size } from "@prisma/client";
import { formatDateTime } from "~/lib/utils";

const { data: sizes, status } = await useFetch("/api/admin/sizes/", {
  key: "sizes",
  transform: (data) =>
    data.map((item: Size) => ({
      ...item,
      createdAt: formatDateTime(item.createdAt),
    })),
});

const breadcrumbs = [{ text: "Sizes" }];
</script>

<template>
  <AdminHeading
    title="Sizes"
    description="Manage sizes"
    :breadcrumbs="breadcrumbs"
  >
    <NuxtLink to="/admin/sizes/create">
      <Button>
        <Icon name="lucide:plus" class="size-4" />
        Add New
      </Button>
    </NuxtLink>
  </AdminHeading>

  <AdminDataTable
    v-if="status !== 'pending'"
    :columns="columns"
    :data="sizes"
    column-to-search="name"
    edit-link="/admin/sizes/:id"
  />
</template>

<style scoped></style>
