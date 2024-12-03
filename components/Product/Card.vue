<script setup lang="ts">
import type { SafeProduct } from "~/types";
import { formatPrice } from "~/utils";

defineProps<{
  data: SafeProduct;
}>();

const { onOpen } = usePreviewModal();
const { addItem } = useCart();
</script>

<template>
  <Card :data="data" class="border p-3 shadow-none">
    <CardContent class="p-0">
      <div class="overflow-hidden rounded-md relative">
        <img :src="data.images[0].url" :alt="data.name" class="h-[200px]" />

        <div v-if="data.isFeatured" class="absolute top-2 left-2">
          <Badge variant="destructive" class="w-auto"> Featured </Badge>
        </div>
        <div v-if="data.isFeatured" class="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button
                  size="icon"
                  class="rounded-full"
                  @click.stop="
                    () => {
                      onOpen(data);
                    }
                  "
                >
                  <Icon name="lucide:expand" class="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview Product</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <h3 class="mt-4 font-bold text-gary-900">{{ data.name }}</h3>
      <p class="italic text-gray-500">{{ data.category.name }}</p>
      <p class="mt-2 font-medium text-foreground">
        {{ formatPrice(data.price) }}
      </p>

      <Button variant="secondary" class="mt-4 w-full" @click="addItem(data)">
        Add to Cart
      </Button>
    </CardContent>
  </Card>
  <ProductModal />
</template>

<style scoped></style>
