import type { APIError } from "~/types";

export const handlerError = (error: any) => {
  const defaultMessage = "An unexpected error occurred.";
  let statusCode = 500;
  let statusMessage = "unexpected error";
  let message = defaultMessage;
  let data = undefined;

  if (error.response) {
    statusCode = error.response.status;
    statusMessage = error.response.statusText;

    if (error.response._data) {
      message =
        error.response._data &&
        (error.response._data.message ?? defaultMessage);

      data = error.response._data && (error.response.errors ?? undefined);
    }
  }

  return <APIError>{
    statusCode,
    statusMessage,
    message,
    data,
  };
};
