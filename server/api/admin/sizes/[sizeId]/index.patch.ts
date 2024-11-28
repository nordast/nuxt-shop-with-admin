import { sizeSchema } from "~/utils/validations";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);

  if (session.user && session.user.role === "ADMIN") {
    const { name, value } = await readValidatedBody(event, (body) =>
      sizeSchema.parse(body),
    );

    try {
      return db.size.update({
        where: {
          id: event.context.params?.sizeId,
        },
        data: {
          name,
          value,
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
