<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary" class="relative">
        <Icon
          :name="
            colorMode.preference === 'light'
              ? 'radix-icons:sun'
              : 'radix-icons:moon'
          "
          class="size-4"
        />
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
