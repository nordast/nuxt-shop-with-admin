<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

type PAYLOAD = {
  name: string;
  email: string;
  password: string;
};

const form = ref<PAYLOAD>({
  name: "",
  email: "",
  password: "",
});

const { isLoading, setLoading, showError, showMessage } = useStore();

const onSubmit = async () => {
  try {
    setLoading(true);

    await $fetch("/api/auth/register", {
      method: "POST",
      body: form.value,
    });

    showMessage({
      title: "Registration was successful!",
      description: "Please log in to access your account.",
    });

    await navigateTo("/auth/login");
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
        <CardTitle class="text-xl text-center"> Sign Up </CardTitle>
        <CardDescription class="text-center">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="name">Name</Label>
            <Input id="name" v-model="form.name" />
          </div>
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
            Create an account
          </Button>
          <AuthGithubButton icon="uil:github" label="Login with GitHub" />
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <NuxtLink to="/auth/login" class="link"> Sign in </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>
