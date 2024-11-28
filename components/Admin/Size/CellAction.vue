<script setup lang="ts">
const { showMessage, showError, setLoading } = useStore();
const isAlertModalVisible = ref(false);

const props = defineProps<{
  size: {
    id: string;
  };
}>();

const copyId = (id: string) => {
  navigator.clipboard.writeText(id);

  showMessage({
    title: " ID copied.",
  });
};

const deleteSize = async () => {
  try {
    setLoading(true);

    await $fetch(`/api/admin/sizes/${props.size.id}`, {
      method: "DELETE",
    });

    showMessage({
      title: "Size deleted successfully",
    });

    await refreshNuxtData("sizes");
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
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="size-8 p-0">
        <span class="sr-only">Open Menu</span>
        <Icon name="lucide:more-horizontal" class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="copyId(size.id)">
        <Icon name="lucide:copy" class="size-4 mr-2" />
        <span>Copy ID</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="navigateTo(`/admin/sizes/${size.id}`)">
        <Icon name="lucide:pencil" class="size-4 mr-2" />
        <span>Edit</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="(isAlertModalVisible = true)">
        <Icon name="lucide:trash" class="size-4 mr-2" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <AlertModal
    v-if="isAlertModalVisible"
    :is-open="isAlertModalVisible"
    @on-confirm="deleteSize"
    @on-close="(isAlertModalVisible = false)"
  />
</template>
