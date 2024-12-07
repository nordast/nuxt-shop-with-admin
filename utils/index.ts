import type { Updater } from "@tanstack/vue-table";

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref,
) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}

export function formatDateTime(
  date: string | Date,
  format: string = "DD.MM.YYYY HH:mm:ss",
) {
  return useDateFormat(new Date(date), format).value;
  // return new Date(date).toLocaleString();
}

export function formatPrice(price: number) {
  const isInteger = Number.isInteger(price);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: isInteger ? 0 : 2,
  });

  return formatter.format(price);
}

export function getResourceName(resourceUrl: string) {
  return resourceUrl
    .split(".")
    [resourceUrl.split(".").length - 2].split("/")
    .pop();
}

export function nl2br(str: string): string {
  return str.replace(/\n/g, "<br />");
}

export function addCloudinaryParams(
  url: string,
  params: string = "w_500/q_auto/f_auto",
): string {
  const uploadSegment = "/image/upload/";

  const index = url.indexOf(uploadSegment);
  if (index === -1) {
    throw new Error(
      'Invalid Cloudinary URL: "/image/upload/" segment not found',
    );
  }

  const before = url.slice(0, index + uploadSegment.length);
  const after = url.slice(index + uploadSegment.length);

  return `${before}${params}/${after}`;
}
