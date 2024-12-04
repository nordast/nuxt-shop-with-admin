<script setup lang="ts">
import { formatPrice } from "../../utils";
import Overview from "~/components/Admin/Overview.vue";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

const { data, status } = await useFetch<any>("/api/admin/analytics/", {
  lazy: true,
});
</script>

<template>
  <div>
    <AdminHeading title="Dashboard" description="Overview of your store" />

    <div class="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader class="card-header">
          <CardTitle class="text-sm font-medium">Total Products</CardTitle>
          <Icon
            name="lucide:dollar-sign"
            class="size-4 text-muted-foreground"
          />
        </CardHeader>
        <CardContent>
          <div v-if="data?.totalRevenue" class="text-2xl font-bold">
            {{ formatPrice(data?.totalRevenue) }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="card-header">
          <CardTitle class="text-sm font-medium">Sales</CardTitle>
          <Icon
            name="lucide:credit-card"
            class="size-4 text-muted-foreground"
          />
        </CardHeader>
        <CardContent>
          <div v-if="data?.salesCount" class="text-2xl font-bold">
            +{{ data?.salesCount }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="card-header">
          <CardTitle class="text-sm font-medium">Product in Stock</CardTitle>
          <Icon name="lucide:package" class="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div v-if="data?.stockCount" class="text-2xl font-bold">
            {{ data?.stockCount }}
          </div>
        </CardContent>
      </Card>
    </div>

    <Card v-if="data?.graphData" class="w-full mt-8">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent class="pl-2">
        <Overview :data="data?.graphData" />
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.card-header {
  @apply flex flex-row items-center justify-between space-y-0 pb-2;
}
</style>
