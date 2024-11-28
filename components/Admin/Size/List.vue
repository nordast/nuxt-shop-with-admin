<script setup lang="ts">
import { columns } from "~/components/Admin/Size/columns";

const { data: sizes, status } = await useFetch("/api/admin/sizes/", {
  key: "sizes",
});

const breadcrumbs = [
  {
    text: "Sizes",
  },
];
</script>

<template>
  <TheHeading
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
  </TheHeading>

  <DataTable
    v-if="status !== 'pending'"
    :columns="columns"
    :data="sizes"
    column-to-search="name"
  ></DataTable>
</template>

<style scoped></style>
