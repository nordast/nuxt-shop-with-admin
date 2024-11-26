<script setup lang="ts">
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
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50"
  >
    <div class="w-full max-w-md">
      <form action="#">
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
                <Input id="name" v-model="form.name" placeholder="Name" />
              </div>
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
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
              <Button type="submit" class="w-full"> Create an account </Button>
              <AuthSotialButton icon="uil:github" label="Login with GitHub" />
            </div>
            <div class="mt-4 text-center text-sm">
              Already have an account?
              <NuxtLink to="/auth/login" class="link"> Sign in </NuxtLink>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  </div>
</template>
