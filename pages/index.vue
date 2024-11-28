<script setup>
definePageMeta({
  middleware: "auth",
});

const { user, loggedIn, clear } = useUserSession();

const logout = async () => {
  await clear();
  navigateTo("/auth/login");
};
</script>

<template>
  <div class="flex flex-col space-y-4 p-10">
    <p>INDEX</p>
    <pre>{{ user }}</pre>
    <pre>{{ loggedIn }}</pre>
    <NuxtLink to="/auth/login">Login</NuxtLink>
    <NuxtLink to="/auth/register">Register</NuxtLink>
    <NuxtLink to="/admin">Admin</NuxtLink>
    <NuxtLink to="/admin/categories">Admin Categories</NuxtLink>
    <NuxtLink to="/admin/colors">Admin Colors</NuxtLink>

    <button @click="logout">Logout</button>
  </div>
</template>
