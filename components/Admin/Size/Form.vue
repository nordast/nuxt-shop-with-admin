<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { RouteParams } from "~/types";

const route = useRoute();
const { isLoading, setLoading, showMessage, showError } = useStore();

const title = ref("Edit Size");
const description = ref("Edit Size");
const toastMessage = ref("Size updated successfully");
const action = ref("Update");
const isEditing = ref(true);
const isAlertModalVisible = ref(false);

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
    description.value = "Edit " + currentSize.name;
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
                placeholder="Size Name"
                v-bind="componentField"
                :disabled="isLoading"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="value">
          <FormItem>
            <FormLabel>Size Value</FormLabel>
            <FormControl>
              <Input
                placeholder="Size Value"
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
    @on-confirm="deleteSize"
    @on-close="(isAlertModalVisible = false)"
  />
</template>

<style scoped></style>
