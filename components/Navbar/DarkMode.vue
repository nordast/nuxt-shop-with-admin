<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary" class="relative">
        <Icon name="radix-icons:sun" class="size-4 icon-sun" />
        <Icon name="radix-icons:moon" class="size-4 icon-moon" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="(colorMode.preference = 'light')">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="(colorMode.preference = 'dark')">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="(colorMode.preference = 'system')">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>
.icon-sun {
  display: block;
}

.icon-moon {
  display: none;
}

.dark-mode .icon-sun {
  display: none;
}

.dark-mode .icon-moon {
  display: block;
}
</style>
