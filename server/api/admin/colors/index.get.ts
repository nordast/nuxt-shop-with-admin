import db from "~/utils/db";

export default defineEventHandler(async () => {
  return db.color.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});
