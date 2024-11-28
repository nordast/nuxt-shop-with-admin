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
  <div class="flex flex-col space-y-2 p-10">
    <p>INDEX</p>
    <pre>{{ user }}</pre>
    <pre>{{ loggedIn }}</pre>
    <NuxtLink to="/auth/login">Login</NuxtLink>
    <NuxtLink to="/auth/register">Register</NuxtLink>
    <NuxtLink to="/admin">Admin Dashboard</NuxtLink>
    <button @click="logout">Logout</button>
  </div>
</template>
