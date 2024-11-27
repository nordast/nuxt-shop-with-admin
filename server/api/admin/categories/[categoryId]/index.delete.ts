import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);

  if (session.user && session.user.role === "ADMIN") {
    return db.category.delete({
      where: {
        id: event.context.params?.categoryId,
      },
    });
  } else {
    throw createError({
      status: 403,
      message: "You are not authorized to perform this action.",
    });
  }
});
