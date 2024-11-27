import { categorySchema } from "~/utils/validations";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);

  if (session.user && session.user.role === "ADMIN") {
    const { name } = await readValidatedBody(event, (body) =>
      categorySchema.parse(body),
    );

    return db.category.update({
      where: {
        id: event.context.params?.categoryId,
      },
      data: {
        name,
      },
    });
  } else {
    throw createError({
      status: 403,
      message: "You are not authorized to perform this action.",
    });
  }
});
