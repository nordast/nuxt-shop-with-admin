<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { RouteParams } from "~/types";

const route = useRoute();
const { isLoading, setLoading, showMessage, showError } = useStore();

const title = ref("Edit Category");
const description = ref("Edit Category");
const toastMessage = ref("Category updated successfully");
const action = ref("Update");
const isEditing = ref(true);
const isAlertModalVisible = ref(false);

// read
const currentCategory = await $fetch(
  `/api/admin/categories/${(route.params as RouteParams).categoryId}`,
);

watchEffect(() => {
  if (!currentCategory?.id) {
    title.value = "Creat Category";
    description.value = "Add a new category";
    toastMessage.value = "Category added successfully";
    action.value = "Create";
    isEditing.value = false;
  } else {
    description.value = "Edit " + currentCategory?.name;
  }
});

const formSchema = toTypedSchema(categorySchema);
const form = useForm({
  validationSchema: formSchema,
  initialValues: currentCategory || {
    name: "",
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    setLoading(true);

    if (isEditing.value) {
      // update
      await $fetch(
        `/api/admin/categories/${(route.params as RouteParams).categoryId}`,
        {
          method: "PATCH",
          body: values,
        },
      );
    } else {
      // create
      await $fetch("/api/admin/categories", {
        method: "POST",
        body: values,
      });
    }

    showMessage({
      title: toastMessage.value,
    });

    await navigateTo("/admin/categories");
  } catch (e) {
    const error = handlerError(e);
    showError(error);
  } finally {
    setLoading(false);
  }
});

const deleteCategory = async () => {
  try {
    setLoading(true);

    // delete
    await $fetch(
      `/api/admin/categories/${(route.params as RouteParams).categoryId}`,
      {
        method: "DELETE",
      },
    );

    showMessage({
      title: "Category deleted successfully",
    });

    await navigateTo("/admin/categories");
  } catch (e) {
    const error = handlerError(e);
    showError(error);
  } finally {
    isAlertModalVisible.value = false;
    setLoading(false);
  }
};

const breadcrumbs = [
  {
    text: "Categories",
    href: "/admin/categories",
  },
  {
    text: title.value,
  },
];
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
        size="sm"
        @click="(isAlertModalVisible = true)"
      >
        <Icon name="lucide:trash" class="size-4" />
        Remove
      </Button>
    </AdminHeading>

    <form class="space-y-4 w-full" @submit.prevent="onSubmit">
      <div class="md:grid md:grid-cols-3 gap-8">
        <AdminFormInput name="name" label="Name" />
      </div>

      <Button :disabled="isLoading" type="submit" class="ml-auto">
        {{ action }}
      </Button>
    </form>
  </div>
  <AdminAlertModal
    v-if="isAlertModalVisible"
    :is-open="isAlertModalVisible"
    @on-confirm="deleteCategory"
    @on-close="(isAlertModalVisible = false)"
  />
</template>

<style scoped></style>
