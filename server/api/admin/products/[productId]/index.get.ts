import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.productId;

  if (id === "create") return {};

  try {
    return await db.product.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });
  } catch {
    throw createError({
      status: 404,
      message: "Page not found",
    });
  }
});
