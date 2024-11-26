<template>
  <div class="main">
    <div class="w-full max-w-md">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.main {
  @apply flex flex-col items-center justify-center min-h-screen bg-gray-50;
}
</style>
