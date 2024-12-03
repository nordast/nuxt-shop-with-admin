<script setup lang="ts">
const { user, clear } = useUserSession();

const logout = async () => {
  await clear();
  navigateTo("/auth/login");
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="relative rounded-full size-9">
        <Avatar>
          <Icon name="radix-icons:avatar" class="size-6" />
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-max-56" align="end">
      <DropdownMenuLabel>{{ user?.name }}</DropdownMenuLabel>
      <DropdownMenuItem @click="logout">
        <Icon name="solar:logout-2-broken" class="size-4 mr-2" />
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
