<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();

const { isLoading } = useStore();

const isModalVisible = computed(() => props.isOpen);

const emits = defineEmits(["onConfirm", "onClose"]);
</script>

<template>
  <AppModal
    :is-modal-visible="isModalVisible"
    title="Aru you sure?"
    description="This action cannot be undone."
    @on-close="emits('onClose')"
  >
    <div class="pt-6 space-x-4 flex items-center justify-end w-full">
      <Button :disabled="isLoading" variant="outline" @click="emits('onClose')">
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
