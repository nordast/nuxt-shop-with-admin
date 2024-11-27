<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

type PAYLOAD = {
  email: string;
  password: string;
};

const form = ref<PAYLOAD>({
  email: "",
  password: "",
});

const { isLoading, setLoading, showError, showMessage } = useStore();

const onSubmit = async () => {
  try {
    setLoading(true);

    await $fetch("/api/auth/login", {
      method: "POST",
      body: form.value,
    });

    showMessage({
      title: "Login successful!",
      description: " Welcome to your account.",
    });

    await navigateTo("/");
  } catch (e) {
    const error = handlerError(e);
    showError(error);
  } finally {
    setLoading(false);
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card>
      <CardHeader>
        <CardTitle class="text-xl text-center"> Login </CardTitle>
        <CardDescription class="text-center">
          Enter your credentials to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="form.email" type="email" required />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-model="form.password"
              type="password"
              required
            />
          </div>
          <Button :disabled="isLoading" type="submit" class="w-full">
            Login
          </Button>
          <AuthGithubButton icon="uil:github" label="Login with GitHub" />
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/auth/register" class="link"> Sign up </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>
