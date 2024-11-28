<script setup lang="ts">
import { columns } from "~/components/Admin/Color/columns";

const { data: colors, status } = await useFetch("/api/admin/colors/", {
  key: "colors",
});

const breadcrumbs = [
  {
    text: "Colors",
  },
];
</script>

<template>
  <TheHeading
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
  </TheHeading>

  <DataTable
    v-if="status !== 'pending'"
    :columns="columns"
    :data="colors"
    column-to-search="name"
  ></DataTable>
</template>

<style scoped></style>
