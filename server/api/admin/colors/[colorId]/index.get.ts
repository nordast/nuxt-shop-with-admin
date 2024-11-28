import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.colorId;

  if (id === "create") return {};

  try {
    return await db.color.findUnique({
      where: { id },
    });
  } catch {
    throw createError({
      status: 404,
      message: "Page not found",
    });
  }
});
