import type { SafeProduct } from "~/types";

interface CartState {
  items: SafeProduct[];
}

export default () => {
  const store = useLocalStorage("nuxt-shop-with-admin-cart", <CartState>{
    items: [],
  });

  const { showMessage } = useStore();

  const addItem = (data: SafeProduct) => {
    const exist = store.value.items.find((item) => item.id === data.id);

    if (exist) {
      showMessage({
        title: "Item already exist",
        variant: "destructive",
      });
      return;
    }

    store.value.items.push(data);
    showMessage({ title: "Item added to cart." });
  };

  const removeItem = (id: string) => {
    store.value.items = [...store.value.items.filter((item) => item.id !== id)];
    showMessage({ title: "Item removed from cart." });
  };

  const removeAllItems = () => {
    store.value.items = [];
    showMessage({ title: "All items removed from cart." });
  };

  return {
    cartItems: store.value.items,
    addItem,
    removeItem,
    removeAllItems,
  };
};
