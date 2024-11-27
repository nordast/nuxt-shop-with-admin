<script setup lang="ts">
const { isLoading, isAlertModalVisible, setAlertModal } = useStore();

const isModalVisible = computed(() => isAlertModalVisible.value);

const emits = defineEmits(["onConfirm"]);
</script>

<template>
  <AppModal
    :is-modal-visible="isModalVisible"
    title="Aru you sure?"
    description="This action cannot be undone."
    @on-close="setAlertModal(false)"
  >
    <div class="pt-6 space-x-4 flex items-center justify-end w-full">
      <Button
        :disabled="isLoading"
        variant="outline"
        @click="setAlertModal(false)"
      >
        Cancel
      </Button>
      <Button
        :disabled="isLoading"
        variant="destructive"
        @click="emits('onConfirm')"
      >
        Confirm
      </Button>
    </div>
  </AppModal>
</template>

<style scoped></style>
