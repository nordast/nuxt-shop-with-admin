import type { APIError } from "~/types";
import { useToast } from "@/components/ui/toast/use-toast";

interface State {
  isLoading: boolean;
  appError: APIError | null;
  isAlertModalVisible: boolean;
}

const state = reactive<State>({
  isLoading: false,
  appError: null,
  isAlertModalVisible: false,
});

export default () => {
  const { isLoading, appError, isAlertModalVisible } = toRefs(state);
  const { toast } = useToast();

  const setLoading = (value: boolean) => (state.isLoading = value);

  const setError = (error: null | APIError) => (state.appError = error);

  const showError = (error: APIError) => {
    toast({
      variant: "destructive",
      title: "Error: " + error.statusCode,
      description: error.message ? error.message : error.statusMessage,
    });
  };

  const showMessage = (content: {
    title: string;
    description?: string;
    variant?: "default" | "destructive" | null | undefined;
  }) => {
    toast({
      variant: content.variant,
      title: content.title,
      description: content.description,
    });
  };

  const setAlertModal = (value: boolean) => (state.isAlertModalVisible = value);

  return {
    isLoading,
    appError,
    setLoading,
    setError,
    showError,
    showMessage,
    isAlertModalVisible,
    setAlertModal,
  };
};
