import db from "~/utils/db";

export default defineEventHandler(async () => {
  return db.size.findMany({
    orderBy: {
      name: "asc",
    },
  });
});
