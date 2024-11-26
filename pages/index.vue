<script setup>
const { user, loggedIn } = useUserSession();
</script>

<template>
  <div>
    <p>INDEX</p>
    <pre>{{ user }}</pre>
    <pre>{{ loggedIn }}</pre>
    <NuxtLink to="/auth/login">Login</NuxtLink>
    <NuxtLink to="/auth/register">Register</NuxtLink>
  </div>
</template>
