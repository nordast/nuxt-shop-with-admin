<script setup lang="ts">
const { user } = useUserSession();
</script>

<template>
  <header class="border z-10">
    <div class="flex h-16 items-center justify-between">
      <NuxtLink to="/" class="">
        <img src="/logo.svg" alt="Logo" class="cursor-pointer h-8" />
      </NuxtLink>

      <nav class="flex items-center space-x-4 lg:space-x-6">
        <template v-if="user">
          <NavbarAdminMenu v-if="user.role === 'ADMIN'" />
          <NavbarUserMenu />
        </template>

        <NuxtLink to="/cart">
          <Button class="relative rounded-full px-5 py-1 h-8">
            <Icon name="lucide:shopping-bag" class="size-4 mr-2" />
            5
          </Button>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
