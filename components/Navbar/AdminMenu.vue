<script setup lang="ts"></script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary" class="relative">
        Admin
        <Icon name="lucide:chevron-down" class="size-4 ml-2" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-max-56" align="end">
      <NuxtLink to="/admin">
        <DropdownMenuItem> Dashboard </DropdownMenuItem>
      </NuxtLink>
      <NuxtLink to="/admin/products">
        <DropdownMenuItem> Products </DropdownMenuItem>
      </NuxtLink>
      <NuxtLink to="/admin/categories">
        <DropdownMenuItem> Categories </DropdownMenuItem>
      </NuxtLink>
      <NuxtLink to="/admin/colors">
        <DropdownMenuItem> Colors </DropdownMenuItem>
      </NuxtLink>
      <NuxtLink to="/admin/sizes">
        <DropdownMenuItem> Sizes </DropdownMenuItem>
      </NuxtLink>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped></style>
