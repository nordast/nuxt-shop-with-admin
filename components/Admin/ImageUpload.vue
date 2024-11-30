<script setup lang="ts">
interface Result {
  info: {
    secure_url: string;
  };
}

interface UploadImageProps {
  value: string[];
  allowedFormats?: string[];
}

defineProps<UploadImageProps>();

const {
  public: { uploadPreset },
} = useRuntimeConfig();

const { isLoading, setLoading, showError, showMessage } = useStore();

const emits = defineEmits(["onChange", "onRemove"]);

const handleUpload = (result: Result) => {
  emits("onChange", result.info.secure_url);
};

const handleError = () => console.log("error");
const handleResult = () => console.log("result");

const deleteImage = async (url: string) => {
  try {
    setLoading(true);

    const resourceName = getResourceName(url);

    await $fetch(`/api/admin/cloudinary/${resourceName}`, {
      method: "DELETE",
    });

    showMessage({
      title: "Image deleted successfully",
    });

    emits("onRemove", url);
  } catch (e) {
    const error = handlerError(e);
    showError(error);
  } finally {
    setLoading(false);
  }
};
</script>

<template>
  <div class="mb-4 flex items-center gap-4">
    <div
      v-for="(url, i) in value"
      :key="i"
      class="relative w-[200px] h-[200px] rounded-md overflow-hidden"
    >
      <div class="z-10 absolute top-2 right-2">
        <Button
          :disabled="isLoading"
          type="button"
          variant="destructive"
          size="sm"
          @click="deleteImage(url)"
        >
          <Icon name="lucide:trash" class="size-4" />
        </Button>
      </div>

      <img :src="url" alt="Image" class="w-full h-full object-cover" />
    </div>
  </div>

  <CldUploadWidget
    v-slot="{ open }"
    :upload-preset="uploadPreset"
    :options="{
      clientAllowedFormats: allowedFormats,
      multiple: true,
      maxFiles: 3,
    }"
    @upload="handleUpload"
    @error="handleError"
    @result="handleResult"
  >
    <Button
      type="button"
      :disabled="isLoading"
      variant="secondary"
      @click="open"
    >
      <Icon name="lucide:image-plus" class="mr-2 size-4" />
      Upload an Image
    </Button>
  </CldUploadWidget>
</template>

<style scoped></style>
