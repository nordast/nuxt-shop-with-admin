<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { RouteParams } from "~/types";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

const route = useRoute();
const { isLoading, setLoading, showMessage, showError } = useStore();

const title = ref("Edit Size");
const description = ref("Edit Size");
const toastMessage = ref("Size updated successfully");
const action = ref("Update");
const isEditing = ref(true);
const isAlertModalVisible = ref(false);

const breadcrumbs = [
  { text: "Sizes", href: "/admin/sizes" },
  { text: title.value },
];

// read
const currentSize = await $fetch(
  `/api/admin/sizes/${(route.params as RouteParams).sizeId}`,
);

watchEffect(() => {
  if (!currentSize?.id) {
    title.value = "Creat Size";
    description.value = "Add a new size";
    toastMessage.value = "Size added successfully";
    action.value = "Create";
    isEditing.value = false;
  } else {
    description.value = "Edit " + currentSize?.name;
  }
});

const formSchema = toTypedSchema(sizeSchema);
const form = useForm({
  validationSchema: formSchema,
  initialValues: currentSize || {
    name: "",
    value: "",
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    setLoading(true);

    if (isEditing.value) {
      // update
      await $fetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`, {
        method: "PATCH",
        body: values,
      });
    } else {
      // create
      await $fetch("/api/admin/sizes", {
        method: "POST",
        body: values,
      });
    }

    showMessage({
      title: toastMessage.value,
    });

    await navigateTo("/admin/sizes");
  } catch (e) {
    const error = handlerError(e);
    showError(error);
  } finally {
    setLoading(false);
  }
});

const deleteSize = async () => {
  try {
    setLoading(true);

    // delete
    await $fetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`, {
      method: "DELETE",
    });

    showMessage({
      title: "Size deleted successfully",
    });

    await navigateTo("/admin/sizes");
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

        <AdminFormInput name="value" label="Value" />
      </div>

      <Button :disabled="isLoading" type="submit" class="ml-auto">
        {{ action }}
      </Button>
    </form>

    <AdminAlertModal
      v-if="isAlertModalVisible"
      :is-open="isAlertModalVisible"
      @on-confirm="deleteSize"
      @on-close="(isAlertModalVisible = false)"
    />
  </div>
</template>

<style scoped></style>
