import type { SafeProduct } from "~/types";

interface PreviewModalStore {
  isOpen: boolean;
  selectedProduct?: SafeProduct;
}

const state = reactive<PreviewModalStore>({
  isOpen: false,
  selectedProduct: undefined,
});

export default () => {
  const { isOpen, selectedProduct } = toRefs(state);

  const onOpen = (product: SafeProduct) => {
    state.isOpen = true;
    state.selectedProduct = product;
  };

  const onClose = () => {
    state.isOpen = false;
    state.selectedProduct = undefined;
  };

  return {
    isOpen,
    selectedProduct,
    onOpen,
    onClose,
  };
};
