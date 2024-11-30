<script setup lang="ts">
import { columns } from "~/components/Admin/Product/columns";
import { formatDateTime, formatPrice } from "~/utils";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

const breadcrumbs = [{ text: "Products" }];

const { data: products, status } = await useFetch("/api/admin/products/", {
  key: "products",
  transform: (data) =>
    data.map((item: any) => ({
      ...item,
      category: item.category.name,
      size: item.size.name,
      color: item.color.value,
      price: formatPrice(+item.price),
      createdAt: formatDateTime(item.createdAt),
    })),
});
</script>

<template>
  <div>
    <AdminHeading
      title="Products"
      description="Manage products"
      :breadcrumbs="breadcrumbs"
    >
      <NuxtLink to="/admin/products/create">
        <Button>
          <Icon name="lucide:plus" class="product-4" />
          Add New
        </Button>
      </NuxtLink>
    </AdminHeading>

    <AdminDataTable
      v-if="status !== 'pending'"
      :columns="columns"
      :data="products"
      column-to-search="name"
      edit-link="/admin/products/:id"
    />
  </div>
</template>

<style scoped></style>
