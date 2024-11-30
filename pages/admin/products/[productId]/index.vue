<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { RouteParams } from "~/types";
import type { Category, Product, Color, Size, Image } from "@prisma/client";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

const route = useRoute();
const { isLoading, setLoading, showMessage, showError } = useStore();

const title = ref("Edit Product");
const description = ref("Edit Product");
const toastMessage = ref("Product updated successfully");
const action = ref("Update");
const isEditing = ref(true);
const isAlertModalVisible = ref(false);

const breadcrumbs = [
  { text: "Products", href: "/admin/products" },
  { text: title.value },
];

const routeId = (route.params as RouteParams).productId;
const currentProduct = await $fetch<Product>(`/api/admin/products/${routeId}`);
const categories = await $fetch<Category[]>("/api/admin/categories");
const colors = await $fetch<Color[]>("/api/admin/colors");
const sizes = await $fetch<Size[]>("/api/admin/sizes");

watchEffect(() => {
  if (!currentProduct?.id) {
    title.value = "Creat Product";
    description.value = "Add a new product";
    toastMessage.value = "Product added successfully";
    action.value = "Create";
    isEditing.value = false;
  } else {
    description.value = "Edit " + currentProduct?.name;
  }
});

const formSchema = toTypedSchema(productSchema);
const form = useForm({
  validationSchema: formSchema,
  initialValues: currentProduct.id
    ? { ...currentProduct, price: parseFloat(String(currentProduct?.price)) }
    : {
        name: "Max",
        images: [],
        price: 0,
        categoryId: "",
        colorId: "",
        sizeId: "",
        isFeatured: false,
        isArchived: false,
      },
});

const { setFieldValue } = form;

const onSubmit = form.handleSubmit(async (values) => {
  try {
    setLoading(true);

    if (isEditing.value) {
      // update
      await $fetch(
        `/api/admin/products/${(route.params as RouteParams).productId}`,
        {
          method: "PATCH",
          body: values,
        },
      );
    } else {
      // create
      await $fetch("/api/admin/products", {
        method: "POST",
        body: values,
      });
    }

    showMessage({
      title: toastMessage.value,
    });

    await navigateTo("/admin/products");
  } catch (e) {
    const error = handlerError(e);
    showError(error);
  } finally {
    setLoading(false);
  }
});

const deleteProduct = async () => {
  try {
    setLoading(true);

    // delete
    await $fetch(
      `/api/admin/products/${(route.params as RouteParams).productId}`,
      {
        method: "DELETE",
      },
    );

    showMessage({
      title: "Product deleted successfully",
    });

    await navigateTo("/admin/products");
  } catch (e) {
    const error = handlerError(e);
    showError(error);
  } finally {
    isAlertModalVisible.value = false;
    setLoading(false);
  }
};
</script>

<template>
  <div>
    <AdminHeading
      :title="title"
      :description="description"
      :breadcrumbs="breadcrumbs"
    >
      <Button
        v-if="isEditing"
        variant="destructive"
        product="sm"
        @click="(isAlertModalVisible = true)"
      >
        <Icon name="lucide:trash" class="product-4" />
        Remove
      </Button>
    </AdminHeading>

    <form class="space-y-4 w-full" @submit.prevent="onSubmit">
      <div class="rounded-md border p-4">
        <FormField v-slot="{ componentField, resetField }" name="images">
          <FormItem>
            <FormLabel>Product Images</FormLabel>
            <FormControl>
              <AdminImageUpload
                :value="
                  componentField.modelValue.map((image: Image) => image.url)
                "
                @on-change="
                  (url) =>
                    resetField({
                      value: [...componentField.modelValue, { url }],
                    })
                "
                @on-remove="
                  (url) =>
                    resetField({
                      value: [
                        ...componentField.modelValue.filter(
                          (currentImage: Image) => currentImage.url !== url,
                        ),
                      ],
                    })
                "
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="md:grid md:grid-cols-3 gap-8">
        <AdminFormInput name="name" label="Name" />

        <AdminFormNumber
          name="price"
          label="Price"
          :set-field-value="setFieldValue"
        />

        <AdminFormSelect
          name="categoryId"
          label="Category"
          :options="categories"
        />

        <AdminFormSelect name="colorId" label="Color" :options="colors" />

        <AdminFormSelect name="sizeId" label="Size" :options="sizes" />

        <AdminFormSelect name="colorId" label="Color" :options="colors" />

        <AdminFormCheckbox
          name="isFeatured"
          label="Featured"
          description="This product will appear in the features product section."
        />

        <AdminFormCheckbox
          name="isArchived"
          label="Archived"
          description="This product will not appear anywhere in the shop."
        />
      </div>

      <Button :disabled="isLoading" type="submit" class="ml-auto">
        {{ action }}
      </Button>
    </form>

    <AdminAlertModal
      v-if="isAlertModalVisible"
      :is-open="isAlertModalVisible"
      @on-confirm="deleteProduct"
      @on-close="(isAlertModalVisible = false)"
    />
  </div>
</template>

<style scoped></style>
