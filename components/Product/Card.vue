<script setup lang="ts">
import type { SafeProduct } from "~/types";
import { addCloudinaryParams, formatPrice } from "~/utils";

const props = defineProps<{
  data: SafeProduct;
}>();

const { addItem } = useCart();

const primaryImg = addCloudinaryParams(props.data.images[0].url);
const secondaryImg = addCloudinaryParams(props.data.images[1].url);
const imageSrc = ref(primaryImg);

const route = useRoute();
const isHomePage = computed(() => {
  return route.path === "/";
});

const isProductModalVisible = ref(false);
</script>

<template>
  <div>
    <NuxtLink :to="`/products/${data.id}`">
      <Card
        :data="data"
        class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:shadow-md"
      >
        <CardContent class="p-0">
          <div class="overflow-hidden rounded-md relative">
            <div class="flex items-center justify-center overflow-hidden h-56">
              <img
                :src="imageSrc"
                :alt="data.name"
                class="mx-auto max-h-56 object-cover object-center"
                @mouseenter="(imageSrc = secondaryImg)"
                @mouseleave="(imageSrc = primaryImg)"
              />
            </div>

            <div
              v-if="data.isFeatured && !isHomePage"
              class="absolute top-2 left-2"
            >
              <Badge variant="destructive" class="w-auto"> Featured </Badge>
            </div>
            <div
              v-if="data.isFeatured && isHomePage"
              class="absolute top-2 right-2"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Button
                      size="icon"
                      class="rounded-full cursor-pointer"
                      @click.stop.prevent="
                        () => {
                          isProductModalVisible = true;
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

          <Button
            variant="secondary"
            class="mt-4 w-full"
            @click.stop.prevent="addItem(data)"
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </NuxtLink>

    <ProductModal
      :is-open="isProductModalVisible"
      :selected-product="data"
      @on-close="(isProductModalVisible = false)"
    />
  </div>
</template>

<style scoped></style>
