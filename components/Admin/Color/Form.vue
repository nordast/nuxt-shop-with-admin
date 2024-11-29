<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { RouteParams } from "~/types";

const route = useRoute();
const { isLoading, setLoading, showMessage, showError } = useStore();

const title = ref("Edit Color");
const description = ref("Edit Color");
const toastMessage = ref("Color updated successfully");
const action = ref("Update");
const isEditing = ref(true);
const isAlertModalVisible = ref(false);

// read
const currentColor = await $fetch(
  `/api/admin/colors/${(route.params as RouteParams).colorId}`,
);

watchEffect(() => {
  if (!currentColor?.id) {
    title.value = "Creat Color";
    description.value = "Add a new color";
    toastMessage.value = "Color added successfully";
    action.value = "Create";
    isEditing.value = false;
  } else {
    description.value = "Edit " + currentColor?.name;
  }
});

const formSchema = toTypedSchema(colorSchema);
const form = useForm({
  validationSchema: formSchema,
  initialValues: currentColor || {
    name: "",
    value: "#000000",
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    setLoading(true);

    if (isEditing.value) {
      // update
      await $fetch(
        `/api/admin/colors/${(route.params as RouteParams).colorId}`,
        {
          method: "PATCH",
          body: values,
        },
      );
    } else {
      // create
      await $fetch("/api/admin/colors", {
        method: "POST",
        body: values,
      });
    }

    showMessage({
      title: toastMessage.value,
    });

    await navigateTo("/admin/colors");
  } catch (e) {
    const error = handlerError(e);
    showError(error);
  } finally {
    setLoading(false);
  }
});

const deleteColor = async () => {
  try {
    setLoading(true);

    // delete
    await $fetch(`/api/admin/colors/${(route.params as RouteParams).colorId}`, {
      method: "DELETE",
    });

    showMessage({
      title: "Color deleted successfully",
    });

    await navigateTo("/admin/colors");
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
    text: "Colors",
    href: "/admin/colors",
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

        <AdminFormInput
          name="value"
          label="Color Code"
          type="color"
          placeholder="#000000"
        />
      </div>

      <Button :disabled="isLoading" type="submit" class="ml-auto">
        {{ action }}
      </Button>
    </form>
  </div>
  <AdminAlertModal
    v-if="isAlertModalVisible"
    :is-open="isAlertModalVisible"
    @on-confirm="deleteColor"
    @on-close="(isAlertModalVisible = false)"
  />
</template>

<style scoped></style>
