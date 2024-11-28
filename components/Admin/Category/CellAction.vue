<script setup lang="ts">
const {
  showMessage,
  showError,
  isAlertModalVisible,
  setAlertModal,
  setLoading,
} = useStore();

const props = defineProps<{
  category: {
    id: string;
  };
}>();

const copyId = (id: string) => {
  navigator.clipboard.writeText(id);

  showMessage({
    title: " ID copied.",
  });
};

const deleteCategory = async () => {
  try {
    setLoading(true);

    await $fetch(`/api/admin/categories/${props.category.id}`, {
      method: "DELETE",
    });

    showMessage({
      title: "Category deleted successfully",
    });

    await refreshNuxtData("categories");
  } catch (e) {
    const error = handlerError(e);
    showError(error);
  } finally {
    setAlertModal(false);
    setLoading(false);
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="size-8 p-0">
        <span class="sr-only">Open Menu</span>
        <Icon name="lucide:more-horizontal" class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="copyId(category.id)">
        <Icon name="lucide:copy" class="size-4 mr-2" />
        <span>Copy ID</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="navigateTo(`/admin/categories/${category.id}`)">
        <Icon name="lucide:pencil" class="size-4 mr-2" />
        <span>Edit</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setAlertModal(true)">
        <Icon name="lucide:trash" class="size-4 mr-2" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <AlertModal v-if="isAlertModalVisible" @on-confirm="deleteCategory" />
</template>
