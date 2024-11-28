import db from "~/utils/db";

export default defineEventHandler(async () => {
  return db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});
