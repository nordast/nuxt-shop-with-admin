import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  try {
    return await db.category.findUnique({
      where: {
        id: event.context.params?.categoryId,
      },
    });
  } catch {
    return {};
  }
});
