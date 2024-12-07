<script setup lang="ts"></script>

<template>
  <Card class="bg-white border border-slate-100 rounded-3xl p-8">
    <CardContent class="p-0">
      <div class="grid gap-4 w-full">
        <div class="h-56 overflow-hidden rounded-md relative">
          <Skeleton class="h-56 transition-all hover:scale-105" />
        </div>

        <Skeleton class="h-6 w-[90%] mt-4" />
        <Skeleton class="h-6 w-[50%]" />
      </div>
    </CardContent>

    <CardFooter class="w-full justify-between p-0">
      <Skeleton class="h-9 w-full mt-4" />
    </CardFooter>
  </Card>
</template>
