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
    description.value = "Edit Category: " + currentCategory.name;
  }
});

const formSchema = toTypedSchema(categorySchema);
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: currentCategory?.name || "",
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
</script>

<template>
  <div>
    <TheHeading :title="title" :description="description">
      <Button
        v-if="isEditing"
        variant="destructive"
        size="sm"
        @click="(isAlertModalVisible = true)"
      >
        <Icon name="lucide:trash" class="size-4" />
        Remove
      </Button>
    </TheHeading>

    <form class="space-y-4 w-full" @submit.prevent="onSubmit">
      <div class="md:grid md:grid-cols-3 gap-8">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Category Name"
                v-bind="componentField"
                :disabled="isLoading"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <Button :disabled="isLoading" type="submit" class="ml-auto">{{
        action
      }}</Button>
    </form>
  </div>
  <AlertModal
    v-if="isAlertModalVisible"
    :is-open="isAlertModalVisible"
    @on-confirm="deleteCategory"
    @on-close="(isAlertModalVisible = false)"
  />
</template>

<style scoped></style>
