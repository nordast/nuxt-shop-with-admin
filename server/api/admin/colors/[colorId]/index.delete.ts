import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);

  if (session.user && session.user.role === "ADMIN") {
    try {
      return db.color.delete({
        where: {
          id: event.context.params?.colorId,
        },
      });
    } catch {
      throw createError({
        status: 404,
        message: "Page not found",
      });
    }
  } else {
    throw createError({
      status: 403,
      message: "You are not authorized to perform this action.",
    });
  }
});
